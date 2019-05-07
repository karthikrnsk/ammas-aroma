import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';

  userRegistration(name, username, password, locality, contact, emailid, address) {

    const data= {
      name: name,
      username: username,
      password: password,
      locality: locality,
      contact: contact,
      emailid: emailid,
      address: address
    }

    return this.http.post(`${this.uri}/userRegister`, data);

  }

}
