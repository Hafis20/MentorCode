import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenteeLoginComponent } from './component/mentee/mentee-login/mentee-login.component';
import { MenteeRegisterComponent } from './component/mentee/mentee-register/mentee-register.component';
import { HomeComponent } from './component/home/home.component';
import { OtpComponent } from './component/otp/otp.component';
import { MentorLoginComponent } from './component/mentor/mentor-login/mentor-login.component';
import { MentorRegisterComponent } from './component/mentor/mentor-register/mentor-register.component';
import { MentorComponent } from './component/mentor/mentor.component';
import { MentorDashboardComponent } from './component/mentor/mentor-dashboard/mentor-dashboard.component';
import {
  MentorLoggedOutAuthGuard,
  MentorLoginAuthGuard,
} from './guard/mentor-guard.guard';
import { ListMentorsComponent } from './component/mentee/list-mentors/list-mentors.component';
import {
  MenteeLoggedOutAuth,
  MenteeLoginAuthGuard,
} from './guard/mentee-guard.guard';
import { MenteeComponent } from './component/mentee/mentee.component';
import { MenteeDashboardComponent } from './component/mentee/mentee-dashboard/mentee-dashboard.component';
import { MenteeForgotPasswordComponent } from './component/mentee/mentee-forgot-password/mentee-forgot-password.component';
import { MenteeNewPasswordComponent } from './component/mentee/mentee-new-password/mentee-new-password.component';
import { MentorNewPasswordComponent } from './component/mentor/mentor-new-password/mentor-new-password.component';
import { MentorForgotPasswordComponent } from './component/mentor/mentor-forgot-password/mentor-forgot-password.component';
import { SlotManagementComponent } from './component/mentor/slot-management/slot-management.component';
import { MentorProfileComponent } from './component/mentor/mentor-profile/mentor-profile.component';
import { ViewMentorComponent } from './component/mentee/view-mentor/view-mentor.component';
import { MyBookingsComponent } from './component/mentee/my-bookings/my-bookings.component';
import { ViewBookingsComponent } from './component/mentor/view-bookings/view-bookings.component';
import { MentorEditProfileComponent } from './component/mentor/mentor-edit-profile/mentor-edit-profile.component';
import { VideoChatMentorComponent } from './component/mentor/video-chat-mentor/video-chat-mentor.component';

// Mentee routes
const menteeRoutes: Routes = [
  {
    path: 'verify-otp',
    component: OtpComponent, // Otp verification
    canActivate: [MenteeLoggedOutAuth],
  },
  {
    path: 'new-password', // Create new password
    component: MenteeNewPasswordComponent,
    canActivate: [MenteeLoggedOutAuth],
  },
  {
    path: 'forgot-password', // Forgot password
    component: MenteeForgotPasswordComponent,
    canActivate: [MenteeLoggedOutAuth],
  },
  {
    path: 'login',
    component: MenteeLoginComponent, // Mentee login
    canActivate: [MenteeLoggedOutAuth],
  },
  {
    path: 'register', // Mentee register
    component: MenteeRegisterComponent,
    canActivate: [MenteeLoggedOutAuth],
  },
  {
    path: 'list-mentors', // For listing the mentors when the user click on the find a mentor button
    component: ListMentorsComponent,
    canActivate: [MenteeLoginAuthGuard],
  },
  {
    path: 'view-mentor/:id',
    component: ViewMentorComponent,
    canActivate: [MenteeLoginAuthGuard],
  },
  {
    path: '', // For mentee profile
    component: MenteeComponent,
    canActivate: [MenteeLoginAuthGuard],
    children: [
      { path: 'dashboard', component: MenteeDashboardComponent },
      { path: 'mybookings', component: MyBookingsComponent },
    ],
  },
];

// Mentor routes
const mentorRoutes: Routes = [
  {
    path: 'verify-otp',
    component: OtpComponent, // Otp verification
    canActivate: [MentorLoggedOutAuthGuard],
  },
  {
    path: 'new-password', // Create new password
    component: MentorNewPasswordComponent,
    canActivate: [MentorLoggedOutAuthGuard],
  },
  {
    path: 'forgot-password', // Forgot password
    component: MentorForgotPasswordComponent,
    canActivate: [MentorLoggedOutAuthGuard],
  },
  {
    path: 'login',
    component: MentorLoginComponent,
    canActivate: [MentorLoggedOutAuthGuard],
  },
  {
    path: 'register',
    component: MentorRegisterComponent,
    canActivate: [MentorLoggedOutAuthGuard],
  },
  {
    path: 'verify-otp',
    component: OtpComponent,
    canActivate: [MentorLoggedOutAuthGuard],
  },
  {
    path: '',
    component: MentorComponent,
    canActivate: [MentorLoginAuthGuard],
    children: [
      { path: 'dashboard', component: MentorDashboardComponent },
      { path: 'slot-management', component: SlotManagementComponent },
      { path: 'profile', component: MentorProfileComponent },
      { path: 'edit-profile', component: MentorEditProfileComponent },
      { path: 'bookings', component: ViewBookingsComponent },
      { path: 'video-chat', component: VideoChatMentorComponent }
    ],
  },
];

const routes: Routes = [
  // Home page
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  // Mentee side
  { path: 'mentee', children: menteeRoutes },

  // Mentor side
  { path: 'mentor', children: mentorRoutes },

  // Lazy loading
  {
    path: 'admin',
    loadChildren: () =>
      import('./component/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
