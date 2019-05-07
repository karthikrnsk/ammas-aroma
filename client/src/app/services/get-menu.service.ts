import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';
  
  getMenu(chefid) {
    const data = {
      chefid: chefid     
    }
    return this.http.post(`${this.uri}/getMenu`, data);
  }
}
