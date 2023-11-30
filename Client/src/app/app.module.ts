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
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './material.component';
import { FormComponent } from './shared/form/form.component';
import { OtpComponent } from './component/otp/otp.component';
import { PadCounterPipe } from './customPipes/padCounter';

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
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
