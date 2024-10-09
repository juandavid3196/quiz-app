import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions : any[] = [];
  overallScore : any = {};
  matchSettings : any = {};

  constructor() { }

  setQuestions(questions: any) : void {
    this.questions = questions;
  }

  getQuestions() : any {
    return this.questions;
  }

  setScore(score: any) : void {
    this.overallScore = score;
  }

  getScore() : any {
    return this.overallScore;
  }

  setMatchSettings(settins: any) : void {
    this.matchSettings = settins;
  }

  getMatchSettings() : any {
    return this.matchSettings;
  }


}
