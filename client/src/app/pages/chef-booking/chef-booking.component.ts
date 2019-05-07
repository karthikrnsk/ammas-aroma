import { Component, OnInit, Injectable } from '@angular/core';
import {GetChefsService} from '../../services/get-chefs.service';
import {GetMenuService} from '../../services/get-menu.service';

import {BookChefService} from '../../services/booking/book-chef.service';
import {MatSnackBar} from '@angular/material';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ChefConfirmComponent} from '../../components/chef-confirm/chef-confirm.component';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';

// @Injectable()
// export class ConfirmService {
//   constructor(private chefBook:ChefBookingComponent) { }

//   getData() {
//     return this.chefBook.
//   }
// }


@Component({
  selector: 'app-chef-booking',
  templateUrl: './chef-booking.component.html',
  styleUrls: ['./chef-booking.component.css']
})
export class ChefBookingComponent implements OnInit {

  // const data;

  chefs=[];

  constructor(private getChefService: GetChefsService, public dialog: MatDialog, private bookChefService: BookChefService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getChefService.getChefs().subscribe(
      res => {   
        var cf;
        var cnt = 0;
        console.log(res['data']['0']);  
        if(res['data'] == 'no chefs') {
          this.snackBar.open("Sorry there are no chefs currently available in your area", " ", {
            duration: 3000
          });
        }
        else {
          this.chefs = res['data'];
        }
      
    })
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

  openMenuCard(chef_id): void {
    const dialogRef = this.dialog.open(MenuCardComponent , {
      width: '980px',
      height: '560px',
      data: {chefid: chef_id}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      console.log('The dialog was closed');
    });
  }

  bookChef(chefid) {
    this.bookChefService.bookChef(chefid).subscribe(
      res => {   
        
        console.log("in book chef results");
        sessionStorage.setItem("chefname",res['data'][0]['name']);
        sessionStorage.setItem("chefcontact",res['data'][0]['contact']);
        sessionStorage.setItem('cfkey', res['cfkey']);

        
        this.openChefConfirm();

      
    });


    // this.bookChefService.bookChef(chefid).subscribe(
    //   res => {   
        
    //     // console.log(res);
    //     // console.log(res['name']);
    //     sessionStorage.setItem("chefname",res['data'][0]['name']);
    //     sessionStorage.setItem("chefcontact",res['data'][0]['contact']);
    //     sessionStorage.setItem('cfkey', res['cfkey']);

        
    //     this.openChefConfirm();

      
    // });
  }


  

  

}
