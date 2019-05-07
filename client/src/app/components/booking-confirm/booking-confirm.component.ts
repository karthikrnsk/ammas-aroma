import { Component, OnInit, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { BookChefService } from '../../services/booking/book-chef.service';
import {ChefConfirmComponent} from '../../components/chef-confirm/chef-confirm.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent implements OnInit {

  cost: number;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bookChefService: BookChefService, public dialog: MatDialog) { }

  ngOnInit() {
    this.cost = this.data['cost'];
  }
  bookChef() {
    this.bookChefService.orderMenu(this.data['chefid'], this.data['orderedMenu'], this.data['cost'], this.data['personcount']).subscribe(
      res => {
        if(res['data'] == 'stored') {
          console.log("successfully stored");
        }
      }
    )

    this.bookChefService.bookChef(this.data['chefid']).subscribe(
      res => {           
        console.log("in book chef results");
        sessionStorage.setItem("chefname",res['data'][0]['name']);
        sessionStorage.setItem("chefcontact",res['data'][0]['contact']);
        sessionStorage.setItem('cfkey', res['cfkey']);        
        this.openChefConfirm();
      
    });
  }

    openChefConfirm(): void {
      const dialogRef = this.dialog.open(ChefConfirmComponent , {
        width: '400px',
        height: '260px'
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        window.location.reload();
        console.log('The dialog was closed');
      });
    }


}
