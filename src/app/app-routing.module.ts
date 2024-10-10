import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { rankingGuard } from './guards/ranking.guard';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:MainFormComponent,canActivate: [authGuard] },
  {path:'dashboard', component:DashboardComponent,canActivate: [authGuard]},
  {path:'ranking/:list', component:RankingComponent,canActivate: [rankingGuard]},
  {path:'ranking', component:RankingComponent,canActivate: [authGuard]},
  { path: '**', redirectTo: 'login' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
