import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedTableComponent } from './component/shared-table/shared-table.component';
import { ListMenteesComponent } from './component/list-mentees/list-mentees.component';
import { ListMentorsComponent } from './component/list-mentors/list-mentors.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { SearchbarComponent } from './component/searchbar/searchbar.component';
import { FilterComponent } from './component/filter/filter.component';
import { ListBookingsComponent } from './component/list-bookings/list-bookings.component';
import { AgChartsAngularModule } from 'ag-charts-angular';



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
    PaginationComponent,
    SearchbarComponent,
    FilterComponent,
    ListBookingsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgChartsAngularModule,
  ],
})
export class AdminModule { }
