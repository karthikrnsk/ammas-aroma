import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';


  logoutChef(chefid) {
    const data = {chefid: chefid};
    return this.http.post(`${this.uri}/logoutChef`, data);
  }
}
