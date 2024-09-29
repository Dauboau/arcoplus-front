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

  createCard(){
    return this.http.post(environment.url + "/createCard",{
      teste: 'teste'
    })
  }

}
