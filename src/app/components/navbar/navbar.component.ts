import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() newMatchActive : boolean  = false;

  constructor(private authService : AuthService, private router: Router){}
 
  logout() : void {
    this.authService.signOut();
  }

  NewMatch(): void {
    this.router.navigate(['/home']);
  }
}
