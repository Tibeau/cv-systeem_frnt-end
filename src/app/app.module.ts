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
import {AuthEffects} from "./store/effects/auth.effects";
import {authReducer} from "./store/reducers/auth.reducers";
import { CvTemplateComponent } from './dashboard-feature/cv-template/cv-template.component';
import { CvItemsComponent } from './dashboard-feature/cv-items/cv-items.component';
import {NgxPrintModule} from "ngx-print";
import { CertificateComponent } from './certificate-feature/certificate/certificate.component';
import { CertificateFormComponent } from './certificate-feature/certificate-form/certificate-form.component';
import {CertificateEffects} from "./store/effects/certificate.effects";
import {certificateReducer} from "./store/reducers/certificate.reducers";
import { ExperienceFormComponent } from './experience-feature/experience-form/experience-form.component';
import { LanguageComponent } from './language-feature/language/language.component';
import { LanguageFormComponent } from './language-feature/language-form/language-form.component';
import { SkillComponent } from './skill-feature/skill/skill.component';
import { SkillFormComponent } from './skill-feature/skill-form/skill-form.component';
import {ExperienceComponent} from "./experience-feature/experience/experience.component";
import {ExperienceEffects} from "./store/effects/experience.effects";
import {experienceReducer} from "./store/reducers/experience.reducers";
import {LanguageEffects} from "./store/effects/language.effects";
import {languageReducer} from "./store/reducers/language.reducers";
import {SkillEffects} from "./store/effects/skill.effects";
import {skillReducer} from "./store/reducers/skill.reducers";
import { SettingsComponent } from './settings-feature/settings/settings.component';
import {SkillItemEffects} from "./store/effects/skillItem.effects";
import {skillItemReducer} from "./store/reducers/skillItem.reducers";
import { CandidatesComponent } from './dashboard-feature/company/candidates/candidates.component';
import {UserEffects} from "./store/effects/user.effects";
import {ToDashboardComponent} from "./shared/to-dashboard/to-dashboard.component";
import {DeleteModalComponent} from "./shared/delete-modal/delete-modal.component";
import { RegistrationComponent } from './invites/registration.component';
import {userReducer} from "./store/reducers/user.reducers";
import {CandidateEffects} from "./store/effects/candidate.effects";
import {candidateReducer} from "./store/reducers/candidate.reducers";
import {newUserReducer} from "./store/reducers/created-user.reducer";
import {CategoryEffects} from "./store/effects/category.effects";
import {categoryReducer} from "./store/reducers/category.reducers";
import { CategoryComponent } from './category-feature/category/category.component';
import { ShortenContentPipe } from './shared/pipes/shorten-content/shorten-content.pipe';

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
    ExperienceComponent,
    ExperienceFormComponent,
    LanguageComponent,
    LanguageFormComponent,
    SkillComponent,
    SkillFormComponent,
    SettingsComponent,
    CandidatesComponent,
    ToDashboardComponent,
    RegistrationComponent,
    CategoryComponent,
    ShortenContentPipe,

  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects, EducationEffects, CertificateEffects, ExperienceEffects, LanguageEffects, SkillEffects, SkillItemEffects, UserEffects, CandidateEffects, CategoryEffects]),
    EffectsModule.forFeature(),
    StoreModule.forRoot({educations: educationReducer, user: authReducer, certificates: certificateReducer, experiences: experienceReducer, languages: languageReducer, skills: skillReducer, skillItems: skillItemReducer, users: userReducer, candidate: candidateReducer, newUser: newUserReducer, categories: categoryReducer}),
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
