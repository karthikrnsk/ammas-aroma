import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class GetChefsService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';


  getChefs() {
    
    const data = {
      latitude : sessionStorage.getItem('latitude'),
      longitude: sessionStorage.getItem('longitude')
    };
    
    return this.http.post(`${this.uri}/getChefs`, data);  
  }
  getPrevChefs() {
    const data = {
      userid: sessionStorage.getItem("id")
    };
    
    return this.http.post(`${this.uri}/getPrevBookings`, data);  
  }

}
