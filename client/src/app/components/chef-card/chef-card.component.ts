import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chef-card',
  templateUrl: './chef-card.component.html',
  styleUrls: ['./chef-card.component.css']
})
export class ChefCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chefs = [
    {name: "Damo", style:"North Indian", icon:"../../../assets/images/img_avatar.1.png"},
    {name: "Damo", style:"North Indian", icon:"../../../assets/images/img_avatar.1.png"},
    {name: "Damo", style:"North Indian", icon:"../../../assets/images/img_avatar.1.png"},
  ]

}
