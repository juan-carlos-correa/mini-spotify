import { Component, OnInit } from '@angular/core';
import { User } from './models/user';

import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit{
  public title = 'MusicFree';
  public user: User;
  public newUser: User;
  public identity;
  public token;
  public errorMessageSignup;
  public errorMessageSignin;

  constructor(private _userService: UserService){
    this.user = new User('','ROLE_USER', '', '','','','');
    this.newUser = new User('','ROLE_USER', '', '','','','');
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmitSigin(){
    console.log(this.user);
    this._userService.signIn(this.user).subscribe(
      res => {
        this.errorMessageSignup = null;
        this.token = res.token;
        this.identity = res.user;
        localStorage.setItem('token', this.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));
      },
      err => {
          const body = JSON.parse(err._body);
          this.errorMessageSignup = body.message;
          console.log(this.errorMessageSignup);
      }
    )
  }

  public onSubmitSignup(){
    console.log(this.newUser);
    this._userService.signUp(this.newUser).subscribe(
      res => {
        console.log(res);
        this.errorMessageSignin = null;
        alert(`Dado de alta con el correo: ${this.newUser.email}`);
        this.newUser = new User('','ROLE_USER', '', '','','','');
      },
      err => {
          const body = JSON.parse(err._body);
          this.errorMessageSignin = body.message;
          console.log(this.errorMessageSignin);
      }
    )
  }

  public logout(){
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.user.email = null;
    this.user.password = null;
    this.errorMessageSignin = null;
    this.errorMessageSignup = null;
  }
}
