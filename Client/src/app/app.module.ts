import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { MenteeLoginComponent } from './component/mentee/mentee-login/mentee-login.component';
import { MentorLoginComponent } from './component/mentor/mentor-login/mentor-login.component';
import { MenteeRegisterComponent } from './component/mentee/mentee-register/mentee-register.component';
import { HomeComponent } from './component/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './material.component';
import { FormComponent } from './shared/form/form.component';
import { OtpComponent } from './component/otp/otp.component';
import { PadCounterPipe } from './customPipes/padCounter.pipe';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MenteeEffect } from './store/Mentee/mentee.effect';
import { MenteeReducer } from './store/Mentee/mentee.reducer';
import { AdminEffect } from './component/admin/store/admin.effect';
import { AdminReducer } from './component/admin/store/admin.reducer';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MentorRegisterComponent } from './component/mentor/mentor-register/mentor-register.component';
import { MentorReducer } from './store/Mentor/mentor.reducer';
import { MentorEffect } from './store/Mentor/mentor.effect';
import { AdminModule } from './component/admin/admin.module';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { FooterComponent } from './shared/footer/footer.component';
import { MentorComponent } from './component/mentor/mentor.component';
import { MentorDashboardComponent } from './component/mentor/mentor-dashboard/mentor-dashboard.component';
import { ListMentorsComponent } from './component/mentee/list-mentors/list-mentors.component';
import { MenteeDashboardComponent } from './component/mentee/mentee-dashboard/mentee-dashboard.component';
import { MenteeComponent } from './component/mentee/mentee.component';
import { CardsComponent } from './component/mentee/cards/cards.component';
import { SharedForgotPasswordComponent } from './component/shared-forgot-password/shared-forgot-password.component';
import { MenteeForgotPasswordComponent } from './component/mentee/mentee-forgot-password/mentee-forgot-password.component';
import { SharedNewPasswordComponent } from './component/shared-new-password/shared-new-password.component';
import { MenteeNewPasswordComponent } from './component/mentee/mentee-new-password/mentee-new-password.component';
import { MentorNewPasswordComponent } from './component/mentor/mentor-new-password/mentor-new-password.component';
import { MentorForgotPasswordComponent } from './component/mentor/mentor-forgot-password/mentor-forgot-password.component';
import { SlotManagementComponent } from './component/mentor/slot-management/slot-management.component';
import { MentorCalenderComponent } from './component/mentor/mentor-calender/mentor-calender.component';
import { AvailableSlotsComponent } from './component/mentor/available-slots/available-slots.component';
import { BookedSlotsComponent } from './component/mentor/created-slots/created-slots.component';
import { MentorProfileComponent } from './component/mentor/mentor-profile/mentor-profile.component';
import { ViewMentorComponent } from './component/mentee/view-mentor/view-mentor.component';
import { DateDirective } from './customDirectives/date.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenteeLoginComponent,
    MentorLoginComponent,
    MenteeRegisterComponent,
    HomeComponent,
    FormComponent,
    OtpComponent,
    PadCounterPipe,
    SidebarComponent,
    MentorRegisterComponent,
    FooterComponent,
    MentorComponent,
    MentorDashboardComponent,
    ListMentorsComponent,
    MenteeDashboardComponent,
    MenteeComponent,
    CardsComponent,
    SharedForgotPasswordComponent,
    MenteeForgotPasswordComponent,
    SharedNewPasswordComponent,
    MenteeNewPasswordComponent,
    MentorNewPasswordComponent,
    MentorForgotPasswordComponent,
    SlotManagementComponent,
    MentorCalenderComponent,
    AvailableSlotsComponent,
    BookedSlotsComponent,
    MentorProfileComponent,
    ViewMentorComponent,
    DateDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    StoreModule.forRoot({mentee:MenteeReducer,admin:AdminReducer,mentor:MentorReducer}, {}),
    EffectsModule.forRoot([MenteeEffect,AdminEffect,MentorEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AdminModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlingInterceptor,multi:true}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
