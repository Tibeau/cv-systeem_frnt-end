import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-feature/dashboard/dashboard.component';
import { LoginComponent } from './registration-login-feature/login/login.component';
import {ContactInfoComponent} from "./contact-info/contact-info.component";
import {EducationComponent} from "./education-feature/education/education.component";
import {EducationFormComponent} from "./education-feature/education-form/education-form.component";
import {CertificationComponent} from "./certification-feature/certification/certification.component";
import {CertificationFormComponent} from "./certification-feature/certification-form/certification-form.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contactInfo', component: ContactInfoComponent },
  { path: 'educations', component: EducationComponent },
  { path: 'educationform', component: EducationFormComponent },
  { path: 'educationform/:id', component: EducationFormComponent },
  { path: 'certifications', component: CertificationComponent },
  { path: 'certificationform', component: CertificationFormComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
