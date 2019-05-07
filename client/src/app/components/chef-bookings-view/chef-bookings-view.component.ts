import { Component, OnInit } from '@angular/core';
import {UserBookingsService} from '../../services/booking/user-bookings.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { FinishBookingInputComponent } from '../finish-booking-input/finish-booking-input.component';

@Component({
  selector: 'app-chef-bookings-view',
  templateUrl: './chef-bookings-view.component.html',
  styleUrls: ['./chef-bookings-view.component.css']
})
export class ChefBookingsViewComponent implements OnInit {

  constructor(private userBookings: UserBookingsService, private bottomSheet: MatBottomSheet) { }

  bookings=[]

  ngOnInit() {
    this.userBookings.getBookings(sessionStorage.getItem('id')).subscribe(
      res => {   
        var cf;
        var cnt = 0;
        console.log(res['data']['0']);  
        if(res['data'] != 'no bookings')
        this.bookings = res['data'];
        
        
      
    })
  }

  openCompleteBooking() {
    this.bottomSheet.open(FinishBookingInputComponent);
  }
}
