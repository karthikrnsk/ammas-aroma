import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChefRegistrationService {
  uri = 'http://localhost:4000';


  constructor(private http: HttpClient) { }

  chefRegistration(name, username, password, locality, contact, emailid, foodstyle) {


    const data= {
      name: name,
      username: username,
      password: password,
      locality: locality,
      contact: contact,
      emailid: emailid,
      foodstyle: foodstyle
    }

    return this.http.post(`${this.uri}/chefRegister`, data);

  }

}
