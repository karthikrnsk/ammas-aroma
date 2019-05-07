import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from "../../services/register/user-registration.service";
import { Router } from '@angular/router'; 
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,    
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,    
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,    
  ]);

  localityFormControl = new FormControl('', [
    Validators.required,    
  ]);



  contactFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern('^[6-9]\d{9}$'),
  ]);

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
}

  constructor(private userRegistrationService : UserRegistrationService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register(name, username, password, locality, contact, emailid, address) {
    
    this.userRegistrationService.userRegistration(name.toUpperCase(), username, password, locality.toUpperCase(), contact, emailid, address.toUpperCase()).subscribe(
      res => {        
      if(res['reg'] == "registered") {
        this.snackBar.open("You have been successfully registered", " ", {
          duration: 3000
        });
        this.router.navigate(['/login']);
      }
      else if(res['reg'] == "notregistered") {
        this.snackBar.open("Sorry You are not registered", " ", {
          duration: 3000
        });
        this.router.navigate(['/user-register']);
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }

}
