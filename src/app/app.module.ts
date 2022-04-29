import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './registration-login-feature/login/login.component';
import { DashboardComponent } from './dashboard-feature/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "./security/auth.service";
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { EducationComponent } from './education-feature/education/education.component';
import { EducationFormComponent } from './education-feature/education-form/education-form.component';
import {CommonModule} from "@angular/common";
import {EducationEffects} from "./store/effects/education.effects";

import {NgxPaginationModule} from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from "../environments/environment.prod";
import {educationReducer} from "./store/reducers/education.reducers";
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import {AuthEffects} from "./store/effects/auth.effects";
import {authReducer} from "./store/reducers/auth.reducers";
import { CvTemplateComponent } from './dashboard-feature/cv-template/cv-template.component';
import { CvItemsComponent } from './dashboard-feature/cv-items/cv-items.component';
import {NgxPrintModule} from "ngx-print";
import { CertificateComponent } from './certificate-feature/certificate/certificate.component';
import { CertificateFormComponent } from './certificate-feature/certificate-form/certificate-form.component';
import {CertificateEffects} from "./store/effects/certificate.effects";
import {certificateReducer} from "./store/reducers/certificate.reducers";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    DashboardComponent,
    ContactInfoComponent,
    EducationComponent,
    EducationFormComponent,
    DeleteModalComponent,
    CvTemplateComponent,
    CvItemsComponent,
    CertificateComponent,
    CertificateFormComponent,

  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects, EducationEffects, CertificateEffects]),
    EffectsModule.forFeature(),
    StoreModule.forRoot({educations: educationReducer, user: authReducer, certificates: certificateReducer}),
    BrowserAnimationsModule,
    LayoutModule,
    CommonModule,
    StoreDevtoolsModule.instrument({
      name: 'Cv systeem',
      logOnly: environment.production
    }),
    NgxPrintModule,
    //reducers
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
