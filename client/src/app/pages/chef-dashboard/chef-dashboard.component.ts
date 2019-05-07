import { Component, OnInit } from '@angular/core';
import {UserBookingsService} from '../../services/booking/user-bookings.service';
import { Router } from '@angular/router'; 
import { LogoutService } from "../../services/logout.service";


 

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-chef-dashboard',
  templateUrl: './chef-dashboard.component.html',
  styleUrls: ['./chef-dashboard.component.css']
})
export class ChefDashboardComponent implements OnInit {

  constructor(private userBookings: UserBookingsService, private router: Router, private logoutService: LogoutService) { }

  bookings=[]

  ngOnInit() {
    // this.userBookings.getBookings(sessionStorage.getItem('id')).subscribe(
    //   res => {   
    //     var cf;
    //     var cnt = 0;
    //     console.log(res['data']['0']);  
    //     this.bookings = res['data'];
      
    // })
  }

  completeBooking(cfkey) {
    console.log(cfkey);
  }

  logout() {
    this.logoutService.logoutChef(sessionStorage.getItem('id')).subscribe(
      res => {
        if(res['logout'] == 'success') {
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('locality');
            sessionStorage.removeItem('foodstyle');
            sessionStorage.removeItem('emailid');
            sessionStorage.removeItem('contact');
            this.router.navigate(['/login']);
        }
        else {
          console.log("sorry cannot logout");
        }
    
      }
    );
  }

}
