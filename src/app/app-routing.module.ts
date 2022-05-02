import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-feature/dashboard/dashboard.component';
import { LoginComponent } from './registration-login-feature/login/login.component';
import {ContactInfoComponent} from "./contact-info/contact-info.component";
import {EducationComponent} from "./education-feature/education/education.component";
import {EducationFormComponent} from "./education-feature/education-form/education-form.component";
import {CertificateComponent} from "./certificate-feature/certificate/certificate.component";
import {CertificateFormComponent} from "./certificate-feature/certificate-form/certificate-form.component";
import {CertificateResolverService} from "./certificate-feature/certificate-resolver.service";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contactinfo', component: ContactInfoComponent },
  { path: 'educations', component: EducationComponent },
  { path: 'educationform', component: EducationFormComponent },
  { path: 'educationform/:id', component: EducationFormComponent, resolve: { certificate: CertificateResolverService } },
  { path: 'certificates', component: CertificateComponent },
  { path: 'certificateform', component: CertificateFormComponent },
  { path: 'certificateform/:id', component: CertificateFormComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
