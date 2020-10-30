import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user:Object;
res:any;
formDetails={
  board:String,
  class:String,
  subject:String,
 chapter:String
}
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile=>{
      this.res=profile;
      console.log(this.res);
      this.user=this.res.user;
    },
    err=>{
    console.log(err);
    return false;
    }
      )
     
  }
  displayDetails(){
    console.log(this.formDetails);
  }

}
