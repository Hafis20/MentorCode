import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenteeLoginComponent } from './component/mentee/mentee-login/mentee-login.component';
import { MenteeRegisterComponent } from './component/mentee/mentee-register/mentee-register.component';
import { HomeComponent } from './component/home/home.component';
import { OtpComponent } from './component/otp/otp.component';


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

  // Lazy loading
  {
    path: 'admin',
    loadChildren: () =>
      import('./component/admin/admin.module').then((m)=>m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
