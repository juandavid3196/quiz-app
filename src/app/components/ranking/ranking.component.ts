import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {

  overallScore : number = 0;
  pointsSection : boolean = true;

  constructor( private questionService : QuestionService){}


  ngOnInit() : void {
    this.overallScore =  this.questionService.getScore();
  }

  openPointsSection():void {
    this.pointsSection = !this.pointsSection;
  }
}
