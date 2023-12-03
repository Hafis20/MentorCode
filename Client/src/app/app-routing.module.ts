import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenteeLoginComponent } from './component/mentee/mentee-login/mentee-login.component';
import { MenteeRegisterComponent } from './component/mentee/mentee-register/mentee-register.component';
import { HomeComponent } from './component/home/home.component';
import { OtpComponent } from './component/otp/otp.component';
import { MentorLoginComponent } from './component/mentor/mentor-login/mentor-login.component';
import { MentorRegisterComponent } from './component/mentor/mentor-register/mentor-register.component';

// Mentee routes
const menteeRoutes: Routes = [
  { path: 'verify-otp', component: OtpComponent },
  { path: 'login', component: MenteeLoginComponent },
  { path: 'register', component: MenteeRegisterComponent },
];

// Mentor routes
const mentorRoutes: Routes = [
  { path: 'login', component: MentorLoginComponent },
  { path: 'register', component: MentorRegisterComponent },
  { path: 'verify-otp', component: OtpComponent },
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
