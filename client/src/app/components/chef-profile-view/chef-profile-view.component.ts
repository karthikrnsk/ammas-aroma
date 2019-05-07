import { Component, OnInit } from '@angular/core';
import { UpdateProfileService } from '../../services/update-profile.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-chef-profile-view',
  templateUrl: './chef-profile-view.component.html',
  styleUrls: ['./chef-profile-view.component.css']
})
export class ChefProfileViewComponent implements OnInit {

  
  getName() {
    return sessionStorage.getItem('name');
  }

  getFoodStyle() {
    return sessionStorage.getItem('foodstyle');
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

  constructor(private updateChef: UpdateProfileService, private snackBar: MatSnackBar) { }

  isDisabled = true;

  ngOnInit() {
  //   if (window.navigator && window.navigator.geolocation) {
  //     window.navigator.geolocation.getCurrentPosition(
  //         position => {
              
  //                 console.log(position)
                  
  //         },
  //         error => {
  //             switch (error.code) {
  //                 case 1:
  //                     console.log('Permission Denied');
  //                     break;
  //                 case 2:
  //                     console.log('Position Unavailable');
  //                     break;
  //                 case 3:
  //                     console.log('Timeout');
  //                     break;
  //             }
  //         }
  //     );
  // };
  // this.name = sessionStorage.getItem('name');
  // console.log(this.name);
  console.log(this.isDisabled);
  }

  

  update(name, locality, contact, emailid, foodstyle) {

    this.updateChef.updateChefProfile(name, locality, contact, emailid, foodstyle).subscribe(
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
