import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserBookingsService {
  

  private uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }
  getBookings(chefid) {
    const data = {chefid: sessionStorage.getItem('id')}
    return this.http.post(`${this.uri}/getBookings`, data);
  }
}
