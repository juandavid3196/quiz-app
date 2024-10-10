import { Component, EventEmitter, Output } from '@angular/core';
import confetti from 'canvas-confetti';
import { QuestionService } from 'src/app/services/question.service';


@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent {

  constructor(private questionService : QuestionService){}

  score: number = 0;
  questionsCount : number = 0;
  correctQuestionsCount : number = 0;
  close : boolean = false;
  @Output() formClose = new EventEmitter<void>();
  

  ngOnInit() : void {
    this.getMatchInfo();
    this.launchConfetti();
  }

  getMatchInfo() : void {
   const matchInfo :any  = this.questionService.getScore();
   if(matchInfo) {
    this.score = matchInfo.score;
    this.questionsCount = matchInfo.totalQuestions;
    this.correctQuestionsCount = matchInfo.correctQuestions;
   }
  }

  getPercentage() : number {
    if (this.questionsCount === 0) return 0; // Evita dividir por 0
    const result = (this.correctQuestionsCount / this.questionsCount) * 100;
    return Math.round(result);
  }
  
  
  onClose():void {
    this.close =  true;
    setTimeout(()=>{
      this.formClose.emit();
    },500);
  }

  launchConfetti() {
    confetti({
      particleCount: 350, // Aumenta el número de partículas
      spread: 120,        // Hace que se disperse más ampliamente
      origin: { y: 0.6 } 
    });
  }

}
