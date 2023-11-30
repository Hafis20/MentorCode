import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenteeLoginComponent } from './component/mentee/mentee-login/mentee-login.component';
import { MenteeRegisterComponent } from './component/mentee/mentee-register/mentee-register.component';
import { HomeComponent } from './component/home/home.component';
import { OtpComponent } from './component/otp/otp.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '' },
  { path: 'verify-otp', component: OtpComponent },
  { path: 'mentee-login', component: MenteeLoginComponent },
  { path: 'mentee-register', component: MenteeRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
