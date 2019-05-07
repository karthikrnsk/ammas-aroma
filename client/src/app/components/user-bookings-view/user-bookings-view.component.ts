import { Component, OnInit } from '@angular/core';
import {GetChefsService} from '../../services/get-chefs.service';
import {UserFeedbackService} from '../../services/user-feedback.service';


@Component({
  selector: 'app-user-bookings-view',
  templateUrl: './user-bookings-view.component.html',
  styleUrls: ['./user-bookings-view.component.css']
})
export class UserBookingsViewComponent implements OnInit {

  constructor(private getbookings: GetChefsService, private userFeedback: UserFeedbackService) { }

  chefs=[];

  ngOnInit() {

    this.getbookings.getPrevChefs().subscribe(
      res => {    
        
        if(res['data'] != "no bookings") {
        console.log(res['data']);  
        this.chefs = res['data'];
        }
        
    })
  }
  israted = false;

  rateBooking(chefid, rating, booking_id) {
    console.log(chefid+" "+rating+" "+booking_id);
    this.userFeedback.rateChef(chefid, rating, booking_id).subscribe(
      res => {
        if(res['data'] == 'updated') {
          console.log("success");
          window.location.reload();
        }
        else {
          console.log("failure");
        }
      }
    )    
  }

}
