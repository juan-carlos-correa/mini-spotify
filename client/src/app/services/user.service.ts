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

  public signUp(user, hash = null){
    if(hash) user.hash = hash;
    let json = JSON.stringify(user);
    let params = json;

    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'login', params, {headers: headers})
                      .map(res => res.json());
  }

}