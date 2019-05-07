import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FinishBookingService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';
  fBooking(cfkey, chefid) {
    const data= { "cfkey": cfkey, "chefid": chefid };
    return this.http.post(`${this.uri}/finishBooking`, data);  

  }

}
