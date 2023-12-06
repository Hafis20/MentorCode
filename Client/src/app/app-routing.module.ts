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
  MenteeLoggedInAuth,
  MenteeLoginAuthGuard,
} from './guard/mentee-guard.guard';
import { MenteeComponent } from './component/mentee/mentee.component';
import { MenteeDashboardComponent } from './component/mentee/mentee-dashboard/mentee-dashboard.component';

// Mentee routes
const menteeRoutes: Routes = [
  {
    path: 'verify-otp',
    component: OtpComponent, // Otp verification
    canActivate: [MenteeLoggedInAuth],
  },
  {
    path: 'login',
    component: MenteeLoginComponent, // Mentee login
    canActivate: [MenteeLoggedInAuth],
  },
  {
    path: 'register', // Mentee register
    component: MenteeRegisterComponent,
    canActivate: [MenteeLoggedInAuth],
  },
  {
    path: 'list-mentors', // For listing the mentors when the user click on the find a mentor button
    component: ListMentorsComponent,
    canActivate: [MenteeLoginAuthGuard],
  },
  {
    path: '',           // For mentee profile
    component: MenteeComponent,
    canActivate: [MenteeLoginAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: MenteeDashboardComponent,
      },
    ],
  },
];

// Mentor routes
const mentorRoutes: Routes = [
  {
    path: '',
    component: MentorComponent,
    canActivate: [MentorLoginAuthGuard],
    children: [{ path: 'dashboard', component: MentorDashboardComponent }],
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
