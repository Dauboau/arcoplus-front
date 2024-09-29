import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PipefyService {

  constructor(
    private http: HttpClient
  ) { }

  private authentication(){
    const headers = { 'Authorization': `Bearer ${environment.personalToken}` }
    return {headers};
  }

  testApi(){

    return this.http.post(environment.urlPipefy,{
      query: '{ me { id email } }'
    }, this.authentication())

  }

}
