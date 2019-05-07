import { Component, OnInit, Injectable } from '@angular/core';
// import { ChefConfirmService} from '../../pages/chef-booking/chef-booking.component';




@Component({
  selector: 'app-chef-confirm',
  templateUrl: './chef-confirm.component.html',
  styleUrls: ['./chef-confirm.component.css']
})
export class ChefConfirmComponent implements OnInit {

  chefname = sessionStorage.getItem('chefname');
  chefcontact = sessionStorage.getItem('chefcontact');
  cfkey = sessionStorage.getItem('cfkey');

  

  constructor() { }

  ngOnInit() {
  }

}
