import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { PadCounterPipe } from './customPipes/padCounter';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MenteeEffect } from './store/Mentee/mentee.effect';
import { MenteeReducer } from './store/Mentee/mentee.reducer';
import { AdminEffect } from './component/admin/store/admin.effect';
import { AdminReducer } from './component/admin/store/admin.reducer';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MentorRegisterComponent } from './component/mentor/mentor-register/mentor-register.component';
import { MentorReducer } from './store/Mentor/mentor.reducer';
import { MentorEffect } from './store/Mentor/mentor.effect';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
