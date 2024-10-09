import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    
  ) {}

  // Registro de usuario
  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Inicio de sesión
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Cerrar sesión
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Obteniendo el usuario actual
  getUser() {
    return this.afAuth.authState;
  }

}
