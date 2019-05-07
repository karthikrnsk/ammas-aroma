import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  uri = 'http://localhost:4000';


  constructor(private http: HttpClient) { }


  updateChefProfile(name, locality, contact, emailid, foodstyle) {


    const data= {
      chefid: sessionStorage.getItem('id'),
      name: name,
      locality: locality,
      contact: contact,
      emailid: emailid,
      foodstyle: foodstyle
    }

    return this.http.post(`${this.uri}/updateChefProfile`, data);

  }



  updateUserProfile(name, locality, contact, emailid, address) {


    const data= {
      userid: sessionStorage.getItem('id'),
      name: name,      
      locality: locality,
      contact: contact,
      emailid: emailid,
      address: address
    }

    return this.http.post(`${this.uri}/updateUserProfile`, data);

  }
}
