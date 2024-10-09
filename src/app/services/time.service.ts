import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private startTime: number;
  private endTime: number;

  constructor() {
    this.startTime = 0;
    this.endTime = 0;
  }

  startTimer() {
    this.startTime = Date.now(); 
  }

  stopTimer(): string {
    this.endTime = Date.now(); 
    const timeElapsed = (this.endTime - this.startTime) / 1000; 

    if (timeElapsed < 60) {
      return `${Math.round(timeElapsed)} seconds`;
    } else {
      const minutes = Math.floor(timeElapsed / 60);
      const seconds = Math.round(timeElapsed % 60);
      return `${minutes} ${(minutes) === 1 ? 'minute' : 'minutes'} and ${seconds} seconds`;
    }
  }
}
