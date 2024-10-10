import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';
import { QuestionService } from 'src/app/services/question.service';
import { TimeService } from 'src/app/services/time.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private questionService : QuestionService , 
    private router : Router,
    private userService: UserService,
    private matchService : MatchService,
    private timeService : TimeService
  ){ }
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
  timerIntervalId: any = null;
  correctQuestionsCount : number = 0;
  overallTime : number = 0;
  userInfo : any = {};
  loading : boolean = false;

ngOnInit() : void {
  this.getUserById();
  this.questions = this.questionService.getQuestions();
 if(this.questions.length > 0){
   this.mixedAnswers =  this.getAnswers(this.questions[this.questionIndex]);
   this.startTimer();
   this.timeService.startTimer()
 }else {
  this.router.navigate(['/home']);
 }
}  

nextQuestion() : void {
  if(this.questionIndex + 2 > this.questions.length){

    const time  = this.timeService.stopTimer();
    const matchInfo : any = {
      score: this.overallScore,
      totalQuestions : this.questions.length,
      correctQuestions : this.correctQuestionsCount,
      time : time
    }
    this.questionService.setScore(matchInfo);
    this.saveMatchData(matchInfo);
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
  
  setTimeout(()=> {
    this.nextQuestion();
  },500)

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

async saveMatchData(matchData: any): Promise<any> {
  this.loading = true;  

  const MatchSetting = this.questionService.getMatchSettings();
  const userId = localStorage.getItem('userId');

  const match = {
    userId: userId,
    score: matchData.score,
    totalQuestions: matchData.totalQuestions,
    correctAnswers: matchData.correctQuestions,
    difficulty: MatchSetting.difficulty ? MatchSetting.difficulty : 'any',
    category: MatchSetting.category ? MatchSetting.category : 'any',
    duration: matchData.time,
  };

  try {
    await this.matchService.createMatch(match);

    if (this.userInfo) {
      const updatedScore =   (this.userInfo.score) ?  this.userInfo.score +  matchData.score : matchData.score;
      await this.userService.updateUser(this.userInfo.id, { score: updatedScore });
      this.loading = false;
      this.router.navigate(['/ranking'],{ queryParams: { list: 'true' } });
    }

    
  } catch (error) {
    console.error('Error al guardar la información:', error);
    this.loading = false; 
  }
}


 getUserById() : any {
    this.userService.getAllUsers().subscribe((users : any[]) => {
    if (users) {
      const id = localStorage.getItem('userId');
      const accountInfo = users.filter((item: any) => item.userId == id);
      if (accountInfo) {
        this.userInfo = accountInfo[0];
      } 
    }
  });
}



}
