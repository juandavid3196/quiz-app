import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RankingComponent } from './components/ranking/ranking.component';
import { PointsComponent } from './components/points/points.component';
import { LoginComponent } from './components/login/login.component';

// Importa los módulos de Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../../src/app/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainFormComponent,
    FilterSelectComponent,
    RankingComponent,
    PointsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Inicializa Firebase con las credenciales del environment
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // Módulo de autenticación
    AngularFirestoreModule, // Módulo de Firestore
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
