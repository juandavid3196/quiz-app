import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'form', component:MainFormComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'ranking', component:RankingComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
