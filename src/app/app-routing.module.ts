import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-feature/dashboard/dashboard.component';
import { LoginComponent } from './registration-login-feature/login/login.component';
import {ContactInfoComponent} from "./contact-info/contact-info.component";
import {EducationComponent} from "./education-feature/education/education.component";
import {EducationFormComponent} from "./education-feature/education-form/education-form.component";
import {CertificateComponent} from "./certificate-feature/certificate/certificate.component";
import {CertificateFormComponent} from "./certificate-feature/certificate-form/certificate-form.component";
import {ExperienceComponent} from "./experience-feature/experience/experience.component";
import {ExperienceFormComponent} from "./experience-feature/experience-form/experience-form.component";
import {SkillComponent} from "./skill-feature/skill/skill.component";
import {SkillFormComponent} from "./skill-feature/skill-form/skill-form.component";
import {LanguageComponent} from "./language-feature/language/language.component";
import {LanguageFormComponent} from "./language-feature/language-form/language-form.component";
import {SettingsComponent} from "./settings-feature/settings/settings.component";
import {RegistrationComponent} from "./invites/registration.component";
import {CategoryComponent} from "./category-feature/category/category.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'invite', component: RegistrationComponent },
  { path: 'contactinfo', component: ContactInfoComponent },
  { path: 'educations', component: EducationComponent },
  { path: 'educationform', component: EducationFormComponent },
  { path: 'educationform/:id', component: EducationFormComponent },
  { path: 'certificates', component: CertificateComponent },
  { path: 'certificateform', component: CertificateFormComponent },
  { path: 'certificateform/:id', component: CertificateFormComponent },
  { path: 'experiences', component: ExperienceComponent },
  { path: 'experienceform', component: ExperienceFormComponent },
  { path: 'experienceform/:id', component: ExperienceFormComponent },
  { path: 'skills', component: SkillComponent },
  { path: 'skillform', component: SkillFormComponent },
  { path: 'skillform/:id', component: SkillFormComponent },
  { path: 'languages', component: LanguageComponent },
  { path: 'languageform', component: LanguageFormComponent },
  { path: 'languageform/:id', component: LanguageFormComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'change-password', component: ChangePasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
