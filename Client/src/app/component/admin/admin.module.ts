import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminAuthInterceptor } from './interceptor/auth.interceptor';
import { SharedTableComponent } from './component/shared-table/shared-table.component';
import { ListMenteesComponent } from './component/list-mentees/list-mentees.component';
import { ListMentorsComponent } from './component/list-mentors/list-mentors.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    SharedTableComponent,
    ListMenteesComponent,
    ListMentorsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:AdminAuthInterceptor,multi:true}
  ]
})
export class AdminModule { }
