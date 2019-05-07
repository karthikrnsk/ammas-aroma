import { Component, OnInit } from '@angular/core';
import { ChefRegistrationService } from "../../services/register/chef-registration.service";
import { Router } from '@angular/router'; 
import { LoginService } from '../../services/login.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-chef-registration',
  templateUrl: './chef-registration.component.html',
  styleUrls: ['./chef-registration.component.css']
})
export class ChefRegistrationComponent implements OnInit {

  
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

  foodstyleFormControl = new FormControl('', [
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

  constructor(private chefRegistrationService : ChefRegistrationService, private router: Router, private loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  register(name, username, password, locality, contact, emailid, foodstyle) {
    
    this.chefRegistrationService.chefRegistration(name.toUpperCase(), username, password, locality.toUpperCase(), contact, emailid, foodstyle.toUpperCase()).subscribe(
      res => {        
      if(res['reg'] == "registered") {
        this.snackBar.open("You have been successfully registered", " ", {
          duration: 4000
        });
        this.router.navigate(['/login']);
      }
      else if(res['reg'] == "notregistered") {
        this.snackBar.open("Sorry You cannot be registered", " ", {
          duration: 4000
        });
        this.router.navigate(['/chef-register']);
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }

}
