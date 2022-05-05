import { Component, OnInit } from '@angular/core';
import { faPhone, faMailBulk, faLocation, faLink, faEarth, faContactCard, faGraduationCap, faBrain, faCertificate, faBriefcase, faDriversLicense } from '@fortawesome/free-solid-svg-icons';
import {Store} from "@ngrx/store";
import {EducationPagination} from "../../models/education/education-pagination";
import {filter, Observable, take} from "rxjs";
import {selectMyEducations} from "../../education-feature/education.selector";
import {Education} from "../../models/education/education";
import {map} from "rxjs/operators";
import {User} from "../../security/user";
import {selectMyUser} from "../../security/user.selector";
import {loadEducations} from "../../store/actions/education.actions";
import {ExperiencePagination} from "../../models/experience/experience-pagination";
import {LanguagePagination} from "../../models/language/language-pagination";
import {SkillPagination} from "../../models/skill/skill-pagination";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";
import {selectMyExperiences} from "../../experience-feature/experience.selector";
import {Experience} from "../../models/experience/experience";
import {selectMyLanguages} from "../../language-feature/language.selector";
import {Language} from "../../models/language/language";
import {selectMySkills} from "../../skill-feature/skill.selector";
import {Skill} from "../../models/skill/skill";
import {selectMyCertificates} from "../../certificate-feature/certificate.selector";
import {Certificate} from "../../models/certificate/certificate";
import {loadExperiences} from "../../store/actions/experience.actions";
import {loadLanguages} from "../../store/actions/language.actions";
import {loadSkills} from "../../store/actions/skill.actions";
import {loadCertificates} from "../../store/actions/certificate.actions";


@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss']
})
export class CvTemplateComponent implements OnInit {
  faPhone = faPhone
  faMailBulk = faMailBulk
  faLocation = faLocation
  faLink = faLink
  faEarth = faEarth
  faContactCard = faContactCard
  faGraduationCap = faGraduationCap
  faBrain = faBrain
  faCertificate = faCertificate
  faBriefcase = faBriefcase
  faDriversLicense = faDriversLicense

  user$: Observable<User | null> = this.authStore.select(selectMyUser);
  educations$: Observable<EducationPagination | null> = this.educationStore.select(selectMyEducations);
  myEducations$: Observable<Education[] | undefined> = this.educations$.pipe(
    filter((educations): educations is EducationPagination => educations !== undefined),
    map(educations => educations?.content.filter(educations => educations.active === true)));

  experiences$: Observable<ExperiencePagination | null> = this.experienceStore.select(selectMyExperiences);
  myExperiences$: Observable<Experience[] | undefined> = this.experiences$.pipe(
    filter((experiences): experiences is ExperiencePagination => experiences !== undefined),
    map(experiences => experiences?.content.filter(experiences => experiences.active === true)));

  languages$: Observable<LanguagePagination | null> = this.languageStore.select(selectMyLanguages);
  myLanguages$: Observable<Language[] | undefined> = this.languages$.pipe(
    filter((languages): languages is LanguagePagination => languages !== undefined),
    map(languages => languages?.content.filter(languages => languages.active === true)));

  skills$: Observable<SkillPagination | null> = this.skillStore.select(selectMySkills);
  mySkills$: Observable<Skill[] | undefined> = this.skills$.pipe(
    filter((skills): skills is SkillPagination => skills !== undefined),
    map(skills => skills?.content.filter(skills => skills.active === true)));

  certificates$: Observable<CertificatePagination | null> = this.certificateStore.select(selectMyCertificates);
  myCertificates$: Observable<Certificate[] | undefined> = this.certificates$.pipe(
    filter((certificates): certificates is CertificatePagination => certificates !== undefined),
    map(certificates => certificates?.content.filter(certificates => certificates.active === true)));



  constructor( private authStore: Store<{ user: User }>,
               private educationStore: Store<{ educations: EducationPagination}>,
               private experienceStore: Store<{ experiences: ExperiencePagination}>,
               private languageStore: Store<{ languages: LanguagePagination}>,
               private skillStore: Store<{ skills: SkillPagination}>,
               private certificateStore: Store<{ certificates: CertificatePagination}>
  ) { }


  ngOnInit(): void {
    this.experienceStore.dispatch(loadExperiences({page: 0, items: 999999999}));
    this.educationStore.dispatch(loadEducations({page: 0, items: 999999999}));
    this.languageStore.dispatch(loadLanguages({page: 0, items: 999999999}));
    this.skillStore.dispatch(loadSkills({page: 0, items: 999999999}));
    this.certificateStore.dispatch(loadCertificates({page: 0, items: 999999999}));

    this.myEducations$.pipe(take(1)).subscribe();
    this.myExperiences$.pipe(take(1)).subscribe();
    this.myLanguages$.pipe(take(1)).subscribe();
    this.mySkills$.pipe(take(1)).subscribe();
    this.myCertificates$.pipe(take(1)).subscribe();
    this.user$.pipe(take(1)).subscribe();
  }
}
