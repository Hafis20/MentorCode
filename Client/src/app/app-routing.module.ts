import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenteeLoginComponent } from './component/mentee/mentee-login/mentee-login.component';
import { MenteeRegisterComponent } from './component/mentee/mentee-register/mentee-register.component';
import { HomeComponent } from './component/home/home.component';
import { OtpComponent } from './component/otp/otp.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { adminLoginGuard } from './guard/admin-login.guard';

// Admin routes
const adminRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminLoginGuard],
  },
];

// Mentor routes
const menteeRoutes: Routes = [
  { path: 'verify-otp', component: OtpComponent },
  { path: 'login', component: MenteeLoginComponent },
  { path: 'register', component: MenteeRegisterComponent },
];

const routes: Routes = [
  // Home page
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  // Mentee side
  { path: 'mentee', children: menteeRoutes },

  // Admin side
  { path: 'admin', children: adminRoutes },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
