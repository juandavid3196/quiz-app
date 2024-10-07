import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  showLogin : boolean =  true;

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      confirm:['', [Validators.required, Validators.minLength(8)]],
    });
  }

  toggleSignup() : void {
    this.showLogin = !this.showLogin
  }

  // Registro de usuario
  signUp() {
    if (this.registerForm.valid) {
      if(this.registerForm.value.password === this.registerForm.value.confirm){
        console.log(this.registerForm.value);
          const { email, password } = this.registerForm.value;
          this.authService.signUp(email, password).then(() => {
            alert('Registration successful!');
            this.router.navigate(['/form']);
          }).catch((error : any) => {
            console.error('Error during registration:', error);
          }); 
      }
    }
  }

  // Inicio de sesión
  signIn() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signIn(email, password).then(() => {
        alert('Login successful!');
        this.router.navigate(['/form']);
      }).catch((error : any) => {
        console.error('Error during login:', error);
      });
    }
  }
}
