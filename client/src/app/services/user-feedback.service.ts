import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserFeedbackService {

  uri = 'http://localhost:4000';


  constructor(private http: HttpClient) { }
  rateChef(chefid, rating, bookingid) {
    const data = {
      chefid: chefid,
      rating: rating,
      bookingid: bookingid
    }
    return this.http.post(`${this.uri}/rateChef`, data);

  }

}
