import { Component, OnInit } from '@angular/core';
import { Menu } from './customer.interface';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ChefMenuService } from '../../services/chef-menu.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-chef-menu',
  templateUrl: './chef-menu.component.html',
  styleUrls: ['./chef-menu.component.css']
})
export class ChefMenuComponent implements OnInit {
  public myForm: FormGroup;

  public chefname = sessionStorage.getItem('name');
  public foodstyle = sessionStorage.getItem('foodstyle');

  constructor(private _fb: FormBuilder, private chefMenuService: ChefMenuService, private router: Router) { }

  ngOnInit() {
      this.myForm = this._fb.group({
          
          menu: this._fb.array([
              this.initMenuItem(),
          ])
      });
  }

  initMenuItem() {
      return this._fb.group({
          dish: ['', Validators.required],
          cost: ['', Validators.required]
      });
  }

  addMenuItem() {
      const control = <FormArray>this.myForm.controls['menu'];
      control.push(this.initMenuItem());
  }

  removeMenuItem(i: number) {
      const control = <FormArray>this.myForm.controls['menu'];
      control.removeAt(i);
  }

  save(model: Menu) {
      // call API to save
      // ...
      console.log(model['value']['menu']);
      this.chefMenuService.storeMenu(model['value']['menu']).subscribe(
        
          res => {
            if(res['data'] == 'stored') {
              console.log("the data has been stored"); 
              this.router.navigate(['/chefdashboard']);        
            }
            else {
                console.log("chef menu is not saved");
            }
        }
      );
  }

}
