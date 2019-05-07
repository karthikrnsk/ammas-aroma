import { Component, OnInit, Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GetMenuService} from '../../services/get-menu.service';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

import { BookingConfirmComponent } from '../booking-confirm/booking-confirm.component';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  origMenu = [];
  orderedMenu = [];
  cost : number;
  
  countFormControl = new FormControl('', [
    Validators.required,    
  ]);
  constructor(private getMenuService: GetMenuService,@Inject(MAT_DIALOG_DATA) public data: any, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.getMenuService.getMenu(this.data['chefid']).subscribe(
      res => {
        this.origMenu = res['data']['0']['menu'];
        console.log(res['data']['0']['menu']);
        for(var i=0;i<res['data']['0']['menu']['length'];i++) {
          this.todo[i] = res['data']['0']['menu'][i]['dish']+'- Rs.'+res['data']['0']['menu'][i]['cost'];
        }
      }
    )
  }
  
  orderMenu(peoplecount) {
    
    this.cost=0;
    var iter : number;
    iter=0;
    for(var i=0;i<this.done.length;i++) {
      var splitted = this.done[i].split('-');
      console.log(splitted[0]);
      for(var j=0;j<this.origMenu.length;j++) {
        if(this.origMenu[j]['dish'] == splitted[0]) {
          // console.log(this.origMenu[j]['cost']);
          this.orderedMenu[iter++]=this.origMenu[j];
          this.cost = this.cost+Number(this.origMenu[j]['cost']);
        }
      }
    }

    console.log(this.orderedMenu);
    console.log(peoplecount);
    this.cost = this.cost*peoplecount;
    this.bottomSheet.open(BookingConfirmComponent, {
      data: {chefid: this.data['chefid'], cost: this.cost, orderedMenu: this.orderedMenu, personcount: peoplecount}
    });
  }

  todo = [];

  done = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


}

