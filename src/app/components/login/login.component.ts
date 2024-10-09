import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Notyf } from 'notyf';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  showLogin : boolean =  true;
  loginError : boolean =  false;
  singUpError : boolean =  false;
  passwordError : boolean = false;

 

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private userService : UserService,
    private afAuth: AngularFireAuth,
  ) {
  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.required,,Validators.minLength(3) ]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      confirm:['', [Validators.required, Validators.minLength(8)]],
    });
  }

  toggleSignup() : void {
    this.showLogin = !this.showLogin
  }

  cleanMessage() : void {
    this.loginError =  false;
  }

  cleanRegisterMessage() : void {
    this.singUpError =  false;
    this.passwordError = false;
  }

  // Registro de usuario
  signUp() : void {
  const  notyf = new Notyf({
    types: [
      {
        type: 'success',
        background: '#5c58ad',  // Color de fondo para el éxito
        icon: {
          className: 'fas fa-check',
          tagName: 'span',
          text: '',  // Puedes dejar el texto del icono vacío o cambiarlo
        },
      },]
    
    });
    
    if (this.registerForm.valid) {
      if(this.registerForm.value.password === this.registerForm.value.confirm){
          const { email, password,nickname } = this.registerForm.value;
          this.authService.signUp(email, password).then((userCredential) => {
            if(userCredential){
              this.userService.addUser({
                userId: userCredential.user?.uid,
                email: email,
                password:password,
                createAt: userCredential.user?.metadata.creationTime,
                nickname: nickname
              });
            }
            notyf.success('Registration successful');
            this.router.navigate(['/home']);
          }).catch((error : any) => {
            console.error('Error during registration:', error);
            this.singUpError = true;
            this.registerForm.reset();
          }); 
      }else{
        this.passwordError = true;
      }
    }
  }

  // Inicio de sesión
 signIn() : void {
  const  notyf = new Notyf({
    types: [
      {
        type: 'success',
        background: '#5c58ad',  // Color de fondo para el éxito
        icon: {
          className: 'fas fa-check',
          tagName: 'span',
          text: '',  // Puedes dejar el texto del icono vacío o cambiarlo
        },
      },]
    
    });
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signIn(email, password).then((userCredential) => {
        if(userCredential.user?.uid){
          localStorage.setItem('userId',userCredential.user?.uid);
        }
        notyf.success('Login successful');
        this.router.navigate(['/home']);
      }).catch((error : any) => {
        console.error('Error during login:', error);
        this.loginError = true;
        this.loginForm.reset();
      });
    }
  }
}
