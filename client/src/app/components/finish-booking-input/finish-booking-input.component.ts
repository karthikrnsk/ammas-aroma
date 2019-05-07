import { Component, OnInit } from '@angular/core';
import { FinishBookingService } from '../../services/finish-booking.service';
import { Router } from '@angular/router'; 
import {MatSnackBar} from '@angular/material';




@Component({
  selector: 'app-finish-booking-input',
  templateUrl: './finish-booking-input.component.html',
  styleUrls: ['./finish-booking-input.component.css']
})
export class FinishBookingInputComponent implements OnInit {

  constructor(private finish: FinishBookingService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  finishBooking(cfkey) {
    this.finish.fBooking(cfkey, sessionStorage.getItem('id')).subscribe(
      res => {
        if(res['data'] == 'success') {
          console.log("success");
          this.snackBar.open("You have Successfully Completed the Booking", " ", {
            duration: 3000
          });
          window.location.reload();
        }
        else {
          console.log("failure");
          this.snackBar.open("Sorry the Confirmation Key is wrong", " ", {
            duration: 3000
          });
          

        }
      }
    )
  }

}
