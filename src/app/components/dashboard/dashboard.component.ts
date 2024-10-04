import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  progress : number =0 ;
  second : number = 60;

nextQuestion() : void {
  this.progress = 0;
  this.second = 60;
  this.startTimer();
}

startTimer(): void {
  const totalTime = 60; 
  for (let index = totalTime; index >= 0; index--) {
    setTimeout(() => {
      this.second = index;

      // Calcula el progreso
      this.progress = ((totalTime - index + 1) / totalTime) * 100;
    }, (totalTime - index) * 1000); 
  }
}

setColor(time:number) : string {
  if(time <= 15) {
    return '#ff4f4f';
  }
  return 'white';
}


}
