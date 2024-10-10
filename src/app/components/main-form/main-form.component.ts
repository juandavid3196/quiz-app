import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterSelectComponent } from '../filter-select/filter-select.component';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent {

  difficultyArray : any = [ "Any Difficulty","Easy","Medium","Hard"];
  categoriesArray : string[] = ["Any Category"]; 
  difficulty : string = '';
  category : string = '';
  categories: any[] = [];
  myForm: FormGroup;

  @ViewChildren(FilterSelectComponent) filterComponent!: QueryList<FilterSelectComponent>;

  constructor(
    private fb: FormBuilder, 
    private questionsService : QuestionService,
    private router: Router,
    private authService : AuthService
  ) {
    this.myForm = this.fb.group({
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit() : void {
    this.getCategories();
  }

  getOption(option:string, type:string) : void {
    if(type == 'category') {
      this.category = option;

    } else if(type == 'difficulty') {
      this.difficulty = option;
    } 
  }

  getId(category:string) : string {
   let item : any =  this.categories.filter(item => item.name == category);
   
   if(category === 'Any Category'){
    return "";
   }else{
     return item[0].id.toString();
   }
  }

   
  getDifficulty(type:string) : string {
     if(type == "Any Difficulty"){
      return "";
     }
    return type;
   }


  getCategories() :  void {
    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => {
          // You can loop through the categories and display them
          data.trivia_categories.forEach((category: { id: any; name: any; }) => {
              this.categoriesArray.push(category.name);
              this.categories.push(category);
          });
        })
        .catch(error => console.error('Error fetching categories:', error));
  }

  getQuestions() : void {
    fetch(`https://opentdb.com/api.php?amount=${this.myForm.value.number}
      ${this.category ? `&category=${this.getId(this.category)}` : ''}
      ${this.difficulty ? `&difficulty=${this.getDifficulty(this.difficulty).toLowerCase()}` : ''}`)
      .then(response => response.json())
      .then(data => {
          
        if(data) {
          this.questionsService.setQuestions(data.results);
          this.questionsService.setMatchSettings({
            category : this.category,
            difficulty: this.difficulty
          });
          this.router.navigate(['/dashboard']);
        }
          this.myForm.reset();
          this.filterComponent.forEach(child => {
            child.cleanSelectedOption();
          });
      })
      .catch(error => console.error('Error fetching categories:', error));  
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.getQuestions();
    } else {
      console.log('Formulario no válido');
    }
  }




}
