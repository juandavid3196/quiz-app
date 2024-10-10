import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent {

  pointsSection : boolean = true;
  users : any[] = [];
  accountInfo: any = {};
  list : string  | null= '';

  constructor( 
    private route: ActivatedRoute,
    private userService : UserService,
  ){}


  ngOnInit() : void {
    this.getParamValue()
    this.getUsers();
    console.log(this.list);
    if(this.list === null){
      this.pointsSection =  false;
    }
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

  getParamValue(): void {
    // Captura el parámetro de consulta
    this.route.queryParamMap.subscribe(params => {
      this.list = params.get('list');
      console.log(this.list);
    });
  }



}
