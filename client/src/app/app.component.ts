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
  public identity;
  public token;

  constructor(private _userService: UserService){
    this.user = new User('','','','','ROLE_USER','');
  }

  ngOnInit(){
    console.log(this._userService.signUp());
  }

  public onSubmit(){
    console.log(this.user);
  }
}
