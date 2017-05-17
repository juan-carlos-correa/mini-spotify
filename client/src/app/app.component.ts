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
  public errorMessage;

  constructor(private _userService: UserService){
    this.user = new User('','','','','ROLE_USER','');
  }

  ngOnInit(){
    
  }

  public onSubmit(){
    console.log(this.user);
    this._userService.signUp(this.user).subscribe(
      res => {
        this.errorMessage = null;
        this.identity = res.token;
      },
      err => {
          const body = JSON.parse(err._body);
          this.errorMessage = body.message;
          console.log(this.errorMessage);
      }
    )
  }
}
