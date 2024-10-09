import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchService } from 'src/app/services/match.service';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {

  overallScore : number = 0;
  pointsSection : boolean = true;
  users : any[] = [];
  accountInfo: any = {};

  constructor( 
    private questionService : QuestionService,
    private matchService: MatchService,
    private userService : UserService
  ){}


  ngOnInit() : void {
    this.overallScore =  this.questionService.getScore();
    this.getUsers();
  }

  openPointsSection():void {
    this.pointsSection = !this.pointsSection;
  }

  getUsers() : void { 
     this.userService.getAllUsers().subscribe((users : any[]) => {
      if (users) {
        const id = localStorage.getItem('userId');
        const accountInfo = users.filter((item: any) => item.userId == id);
        if (accountInfo) {
            this.users = this.sortByScoreDescending(users);
            this.accountInfo = accountInfo[0];
        } 
      }
    });
  }

   sortByScoreDescending(arr: any) {
    return arr.sort((a:any, b:any) => b.score - a.score);
  }


}
