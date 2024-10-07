import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private questionService : QuestionService , private router : Router ){ }
  progress : number =0 ;
  second : number = 60;
  questions : any[] = []; 
  questionIndex : number = 0;
  answerSelected : string = '';
  correct : boolean = false;
  overallScore : number = 0;
  mixedAnswers : string[] = [];
  blockedBtn : boolean = false;
  intervalId: any = null;
  correctQuestionsCount : number = 0;

ngOnInit() : void {
 this.questions = this.questionService.getQuestions();
 if(this.questions){
   this.mixedAnswers =  this.getAnswers(this.questions[this.questionIndex]);
   this.startTimer();
 }
}  

nextQuestion() : void {
  if(this.questionIndex + 2 > this.questions.length){
    const matchInfo : any = {
      score: this.overallScore,
      totalQuestions : this.questions.length,
      correctQuestions : this.correctQuestionsCount
    }
    this.questionService.setScore(matchInfo);
    this.router.navigate(['/ranking']);
  }else {
    this.blockedBtn =  false;
    this.startTimer();
    this.questionIndex += 1;
    this.correct = false;
    this.answerSelected = '';
    this.mixedAnswers =  this.getAnswers(this.questions[this.questionIndex]);
  }  
}

startTimer(): void {
  this.resetTimer();  // Detener cualquier temporizador anterior

  const totalTime = 60; // Tiempo total en segundos
  this.second = totalTime;
  this.progress = 0;

  // Iniciar el temporizador
  this.intervalId = setInterval(() => {
    this.second--;
    this.progress = ((totalTime - this.second) / totalTime) * 100; // Actualizar progreso

    if (this.second <= 0) {
      this.resetTimer();
      this.nextQuestion();
    }
  }, 1000); // Ejecutar cada segundo (1000 ms)
}

resetTimer(): void {
  if (this.intervalId) {
    clearInterval(this.intervalId); // Detener el temporizador anterior
    this.intervalId = null; // Limpiar el ID del intervalo
  }
}

setColor(time:number) : string {
  if(time <= 15) {
    return '#ff4f4f';
  }
  return 'white';
}

getAnswers(question : any) : string[] {

  let answers: string[] = [];

  for (let index = 0; index < question.incorrect_answers.length; index++) {
    if(question.incorrect_answers[index] !== undefined){
      answers.push(question.incorrect_answers[index]);
    }
  }
  answers.push(question.correct_answer);
  const mixedAnswers = this.mixArray(answers);
  return mixedAnswers;
}

mixArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}

verifyAnswer(answer:string , question: any, time:number) : void {
  this.answerSelected = answer;
  this.blockedBtn = true;
  if(answer === question.correct_answer){
    this.correct = true;
    this.correctQuestionsCount += 1;
    this.calculateScore(question,time);
  }
  if(this.questionIndex + 2 > this.questions.length){
    const matchInfo : any = {
      score: this.overallScore,
      totalQuestions : this.questions.length,
      correctQuestions : this.correctQuestionsCount
    }
    this.questionService.setScore(matchInfo);
    setTimeout(()=>{
      this.router.navigate(['/ranking']);
    },1000)
  }else{
    setTimeout(()=> {
      this.nextQuestion();
    },1000)
  } 
}

 calculateScore(question:any,time:number) : void {
 
  let score : number =0;

  if(question.difficulty === 'easy'){
    score += 10;
  }else if(question.difficulty === 'medium'){
    score += 20;
  }else {
    score += 30;
  }

  if(question.type == 'boolean'){
    score += 5;
  }else{
    score += 10;
  }
  
  let timeFactor = time/60;

  const scoreFinal =  score * timeFactor;
  
  let previousScore =  this.overallScore;
  this.overallScore =  Math.round(scoreFinal) + previousScore;
}

}
