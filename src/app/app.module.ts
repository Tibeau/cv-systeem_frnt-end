import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './registration-login-feature/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "./security/auth.service";
import {AuthEffects} from "./store/effects/auth.effects";
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { EducationComponent } from './education-feature/education/education.component';
import { EducationFormComponent } from './education-feature/education-form/education-form.component';
import { CertificationComponent } from './certification-feature/certification/certification.component';
import {CommonModule} from "@angular/common";
import {EducationEffects} from "./store/effects/education.effects";

import {NgxPaginationModule} from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from "../environments/environment.prod";
import {educationReducer} from "./store/reducers/education.reducers";
import { DeleteModalComponent } from './delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    DashboardComponent,
    ContactInfoComponent,
    EducationComponent,
    EducationFormComponent,
    CertificationComponent,
    DeleteModalComponent,

  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects, EducationEffects]),
    EffectsModule.forFeature(),
    StoreModule.forRoot({educations: educationReducer}),
    BrowserAnimationsModule,
    LayoutModule,
    CommonModule,
    StoreDevtoolsModule.instrument({
      name: 'Cv systeem',
      logOnly: environment.production
    })
    //reducers
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
