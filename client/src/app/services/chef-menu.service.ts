import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChefMenuService {
  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';
  storeMenu(menuArray) {
    const data = {
      chefid: sessionStorage.getItem('id'),
      chefMenuArray: menuArray
    }
    return this.http.post(`${this.uri}/storeMenu`, data);
  }
}
