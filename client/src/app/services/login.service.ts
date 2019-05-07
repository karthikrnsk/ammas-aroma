import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';


  userLogin(username, password) {
    
    const credentials = {
      username: username,
      password: password
    };
    
    let data = this.http.post(`${this.uri}/userlogin`, credentials);
    
    return data;
  
  }


  chefLogin(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/cheflogin`, credentials);
  }

  updateChefLocation(lat, lon) {
    const loc = {
      chefid: sessionStorage.getItem('id'),
      latitude: lat,
      longitude: lon
    }
    return this.http.post(`${this.uri}/updateChefLocation`, loc);
  }
  updateUserLocation(lat, lon) {
    const loc = {
      userid: sessionStorage.getItem('id'),
      latitude: lat,
      longitude: lon
    }
    sessionStorage.setItem('latitude', lat);
    sessionStorage.setItem('longitude', lon);
    return this.http.post(`${this.uri}/updateUserLocation`, loc);
  }

  setLocal(contact: string, emailid: string, locality: string, id: string, name: string) {
    sessionStorage.setItem('locality', locality);
    sessionStorage.setItem('emailid', emailid);
    sessionStorage.setItem('contact', contact);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
  }

  setFoodStyle(foodstyle: string) {
    sessionStorage.setItem('foodstyle', foodstyle);
  }
  
  getFoodStyle() {
    return sessionStorage.getItem('foodstyle');
  }

  setAddress(address: string) {
    sessionStorage.setItem('address', address);
  }
  
  getAddress() {
    return sessionStorage.getItem('address');
  }

  getLocality() {
    return sessionStorage.getItem('locality');
  }

  getEmailId() {
    return sessionStorage.getItem('emailid');
  }

  getContact() {
    return sessionStorage.getItem('contact');
  }

  getUserId() {
    return sessionStorage.getItem('userid');
  }

  deleteLocal() {
    sessionStorage.removeItem('locality');
    sessionStorage.removeItem('emailid');
    sessionStorage.removeItem('contact');
    sessionStorage.removeItem('userid');
  }
  deleteFoodStyle() {
    sessionStorage.removeItem('foodstyle');
  }

  deleteaddress() {
    sessionStorage.removeItem('address');
  }

}

