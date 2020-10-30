import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;
  isloggedIn:Boolean;

  constructor(private http:HttpClient) { }
  registerUser(user){
    let headers=new HttpHeaders;
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/register',user,{headers:headers,responseType: 'json'})
  }

  authenticateUser(user){
    let headers=new HttpHeaders;
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/authenticate',user,{headers:headers,responseType: 'json'})
  }
storeUserData(token,user){
  localStorage.setItem('id_token',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authToken=token;
  this.user=user;

}
logout(){
  this.authToken=null;
  this.user=null;
  localStorage.clear();
}

getProfile(){
  //let headers=new HttpHeaders;
  this.LoadToken();
  var headers = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': this.authToken})
  console.log(this.authToken);
  /*headers.append('Authorization',this.authToken);
  headers.append('Content-Type','application/json');*/
  return this.http.get('http://localhost:3000/profile',{headers:headers,responseType: 'json'})

}

LoadToken(){
  const token=localStorage.getItem('id_token');
  this.authToken=token;
}

loggedIn(){
  if(this.authToken){
    return true;
  }
  else{
    return false;
  }
  const expiry = (JSON.parse(atob(this.authToken.split('.')[1]))).exp;
  this.isloggedIn=(Math.floor((new Date).getTime() / 1000)) >= expiry;
  return this.isloggedIn;
}
}
