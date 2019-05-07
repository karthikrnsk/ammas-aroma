import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ChefRegistrationComponent } from './pages/chef-registration/chef-registration.component';
import { ChefBookingComponent } from './pages/chef-booking/chef-booking.component';
import { ChefDashboardComponent } from './pages/chef-dashboard/chef-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ChefMenuComponent } from './pages/chef-menu/chef-menu.component';

//const routes: Routes = [];
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'user-register', component: UserRegistrationComponent},
  { path: 'chef-register', component: ChefRegistrationComponent},
  { path: 'chefbook', component: ChefBookingComponent},
  { path: 'chefdashboard', component: ChefDashboardComponent},
  { path: 'userdashboard', component: UserDashboardComponent},  
  { path: 'admin', component: AdminComponent},
  { path: 'chefmenu', component: ChefMenuComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
