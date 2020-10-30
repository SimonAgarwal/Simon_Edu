import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  msg:String="";
  Res:any;
  err:Boolean=false;
  constructor(private validateService:ValidateService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user={
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
    if(!this.validateService.validateRegister(user)){
      this.msg="please fill in all the fields";
      this.err=true;
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.msg="please enter a valid email";
      this.err=true;
      return false;
    }

    this.authService.registerUser(user).subscribe(data=>{
        this.Res=data;
      if(this.Res.success){
        this.msg="Registered Successfully";
        this.err=true;
        this.router.navigate(['/login']);
      }else{
        this.msg="Cannot Register!Something went wrong";
        this.err=true;
        this.router.navigate(['/register']);
      }
    })
  }

}
