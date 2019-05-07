import { Component, OnInit } from '@angular/core';
import { UpdateProfileService } from '../../services/update-profile.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {

  constructor(private updateUser: UpdateProfileService, private snackBar: MatSnackBar) { }


  getName() {
    return sessionStorage.getItem('name');
  }

  getAddress() {
    return sessionStorage.getItem('address');
  }

  getLocality() {
    return sessionStorage.getItem('locality');
  }

  getEmail() {
    return sessionStorage.getItem('emailid');
  }

  getContact() {
    return sessionStorage.getItem('contact');
  }

  ngOnInit() {
  }
  isDisabled = true;


  update(name, locality, contact, emailid, address) {

    this.updateUser.updateUserProfile(name, locality, contact, emailid, address).subscribe(
      res => {        
        if(res['update'] == "updated") {
          this.snackBar.open("Your Profile has been updated successfully", " ", {
            duration: 3000
          });
          this.isDisabled = true;
        }
        else if(res['update'] == "notupdated") {
          this.snackBar.open("Error in updating Profile", " ", {
            duration: 3000
          });
          
        }
        else {
          console.log("error")
        }
      }
    )
    
  }


  edit() {    
    this.isDisabled = false;    
    // console.log(name);
  }


}
