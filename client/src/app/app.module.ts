import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { ChefBookingComponent } from './pages/chef-booking/chef-booking.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSortModule} from '@angular/material/sort'; 
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';  
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatStepperModule} from '@angular/material/stepper';
import {DragDropModule} from '@angular/cdk/drag-drop'; 


import {MatTooltipModule} from '@angular/material/tooltip'; 
import { ChefCardComponent } from './components/chef-card/chef-card.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ChefRegistrationComponent } from './pages/chef-registration/chef-registration.component';
import { LoginService } from "./services/login.service";
import { UserRegistrationService } from "./services/register/user-registration.service";
import { ChefRegistrationService } from "./services/register/chef-registration.service";
import { ChefCalendarComponent } from './components/chef-calendar/chef-calendar.component';
import { BookChefService } from './services/booking/book-chef.service';
import { ChefConfirmComponent } from './components/chef-confirm/chef-confirm.component';
import { ChefDashboardComponent } from './pages/chef-dashboard/chef-dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ChefBookingsViewComponent } from './components/chef-bookings-view/chef-bookings-view.component';
import { ChefProfileViewComponent } from './components/chef-profile-view/chef-profile-view.component';
import { ChefQuicktoolsViewComponent } from './components/chef-quicktools-view/chef-quicktools-view.component';
import { UserProfileViewComponent } from './components/user-profile-view/user-profile-view.component';
import { UserBookingsViewComponent } from './components/user-bookings-view/user-bookings-view.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { FinishBookingInputComponent } from './components/finish-booking-input/finish-booking-input.component';
import { BookingRatingComponent } from './components/booking-rating/booking-rating.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminChefDetailsComponent } from './components/admin-chef-details/admin-chef-details.component';
import { ChefMenuComponent } from './pages/chef-menu/chef-menu.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { BookingConfirmComponent } from './components/booking-confirm/booking-confirm.component';


// const routes: Routes = [
//   { path: 'login', component: LoginComponent},
//   { path: 'user-register', component: UserRegistrationComponent},
//   { path: 'chef-register', component: ChefRegistrationComponent},
//   { path: 'chefbook', component: ChefBookingComponent},
//   { path: 'chefdashboard', component: ChefDashboardComponent},
//   { path: 'userdashboard', component: UserDashboardComponent},  
//   { path: 'admin', component: AdminComponent},
//   { path: '', redirectTo: 'list', pathMatch: 'full'}
// ];


@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    
    ChefBookingComponent,
    
    ChefCardComponent,
    
    
    UserRegistrationComponent,
    
    ChefRegistrationComponent,    
    ChefCalendarComponent, ChefConfirmComponent, ChefDashboardComponent, SideBarComponent, ChefBookingsViewComponent, ChefProfileViewComponent, ChefQuicktoolsViewComponent, UserProfileViewComponent, UserBookingsViewComponent, UserDashboardComponent, FinishBookingInputComponent, BookingRatingComponent, AdminComponent, AdminChefDetailsComponent, ChefMenuComponent, MenuCardComponent, BookingConfirmComponent
    
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(routes),
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatRadioModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatSortModule,
    MatTableModule,
    DragDropModule,
    MatTooltipModule
  ],
  entryComponents: [
    ChefCalendarComponent,
    ChefConfirmComponent,
    FinishBookingInputComponent,
    UserBookingsViewComponent,
    MenuCardComponent,
    BookingConfirmComponent
],
  providers: [LoginService, UserRegistrationService, ChefRegistrationService, BookChefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
