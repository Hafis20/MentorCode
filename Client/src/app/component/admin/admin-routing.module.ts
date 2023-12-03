import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoggedInAuthGuard, LoginAuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[LoggedInAuthGuard] },
  { path: '', component: AdminComponent,canActivate:[LoginAuthGuard] ,children:[
    { path: 'dashboard', component: DashboardComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
