import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:String;
password:String;
msg:String="";
Res:any;
err:Boolean=false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onLoginSubmit(){
    const user={
      username:this.username,
      password:this.password
    }
    this.authService.authenticateUser(user).subscribe(data=>{
      this.Res=data;
      if(this.Res.success){
        this.err=false;
        this.authService.storeUserData(this.Res.token,this.Res.user);
        this.router.navigate(['/profile']);

      }else{
        this.msg=this.Res.msg;
        this.err=true;
        this.router.navigate(['/login']);
      }
    })
  }

}
