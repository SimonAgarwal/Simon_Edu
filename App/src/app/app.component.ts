import { Component } from '@angular/core';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  constructor(public authService:AuthService,private router:Router,private validateService:ValidateService){}
  onLogoutClick(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
