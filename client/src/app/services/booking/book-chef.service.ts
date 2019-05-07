import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookChefService {
  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }
  bookChef(chefid) {
    const data = {chefid: chefid, userid: sessionStorage.getItem("id"), emailid: sessionStorage.getItem('emailid')}
    return this.http.post(`${this.uri}/bookChef`, data);
  }
  orderMenu(chefid, orderedMenu, cost, personcount) {
    const data = {chefid: chefid, orderedMenu: orderedMenu, cost: cost, personcount: personcount}
    return this.http.post(`${this.uri}/orderMenu`, data)
  }
}
