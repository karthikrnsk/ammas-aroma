import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserRegistrationComponent} from '../user-registration/user-registration.component';
import {ChefRegistrationComponent} from '../chef-registration/chef-registration.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  login_type: String;
  constructor(private loginService : LoginService, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
      login_type: ''  
    });
   }

  ngOnInit() {
  }

  

 login(username, password, login_type) {
    console.log(login_type);
    let unauthmessage = "Login Failed";
    if(login_type == "user") {
      
      this.loginService.userLogin(username, password).subscribe(
        res => {   
          console.log();     
        if(res['auth'] == "authenticated") {
          console.log(res);
          //console.log(res['locality']);
          this.loginService.setLocal(res['contact'], res['emailid'], res['locality'], res['userid'], res['name']);
          this.loginService.setAddress(res['address']);
          this.getGeoLocation("user");
          this.router.navigate(['/userdashboard']);
        }
        else if(res['auth'] == "unauthenticated") {
          this.snackBar.open(unauthmessage, " ", {
            duration: 3000
          });
        }
        else {
          this.router.navigate(['/']);
        }
      })
    }
    if(login_type == "chef") {
      this.loginService.chefLogin(username, password).subscribe(
        res => {        
        if(res['auth'] == "authenticated") {
          // console.log(this.getGeoLocation());
          this.loginService.setLocal(res['contact'], res['emailid'], res['locality'], res['chefid'], res['name']);
          this.loginService.setFoodStyle(res['foodstyle']);
          this.getGeoLocation("chef");
          if(res['ismenuset'] == 'no') {
            this.router.navigate(['/chefmenu']);
          }
          else {
            this.router.navigate(['/chefdashboard']);
          }
          

        }
        else if(res['auth'] == "unauthenticated") {
          this.snackBar.open(unauthmessage, " ", {
            duration: 3000
          });
        }
        else {
          this.router.navigate(['/']);
        }
      })
    }
  }

  getGeoLocation(type) {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
            console.log(position.coords.latitude);
            // return position.coords;       
            if(type == "chef") {
              this.loginService.updateChefLocation(position.coords.latitude, position.coords.longitude).subscribe(
                res => {
                  console.log(res);
                }
              )
            }
            else {
              this.loginService.updateUserLocation(position.coords.latitude, position.coords.longitude).subscribe(
                res => {
                  console.log(res);
                }
              )
            }
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
  }

  openUserReg(): void {
    const dialogRef = this.dialog.open(UserRegistrationComponent, {
      width: '550px',
      height: '640px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openChefReg(): void {
    const dialogRef = this.dialog.open(ChefRegistrationComponent, {
      width: '550px',
      height: '620px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


