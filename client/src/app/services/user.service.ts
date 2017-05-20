import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { config } from './config';

@Injectable()
export class UserService{
  public url: string;

  constructor(private _http: Http){
    this.url = config.url;
  }

  public signIn(user){
    let params = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this.url + 'login', params, {headers: headers})
                      .map(res => res.json());
  }

  public signUp(user){
    let params = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this.url + 'register', params, {headers: headers})
                      .map(res => res.json());
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    return identity;
  }

  getToken(){
    let token = localStorage.getItem('token');
    return token;
  }

}