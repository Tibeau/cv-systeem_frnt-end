import { Component, OnInit } from '@angular/core';
import { faPencil,faPhone, faMailBulk, faLocation, faLink, faEarth, faContactCard, faGraduationCap, faBrain, faCertificate, faBriefcase, faDriversLicense } from '@fortawesome/free-solid-svg-icons';
import {Store} from "@ngrx/store";
import {EducationPagination} from "../../models/education/education-pagination";
import {filter, Observable, take} from "rxjs";
import {selectMyEducations} from "../../selectors/education.selector";
import {Education} from "../../models/education/education";
import {map} from "rxjs/operators";
import {User} from "../../security/user";
import {selectMyUser} from "../../selectors/auth.selector";
import {loadEducations} from "../../store/actions/education.actions";
import {ExperiencePagination} from "../../models/experience/experience-pagination";
import {LanguagePagination} from "../../models/language/language-pagination";
import {SkillPagination} from "../../models/skill/skill-pagination";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";
import {selectMyExperiences} from "../../selectors/experience.selector";
import {Experience} from "../../models/experience/experience";
import {selectMyLanguages} from "../../selectors/language.selector";
import {Language} from "../../models/language/language";
import {selectMySkills} from "../../selectors/skill.selector";
import {Skill} from "../../models/skill/skill";
import {selectMyCertificates} from "../../selectors/certificate.selector";
import {Certificate} from "../../models/certificate/certificate";
import {loadExperiences} from "../../store/actions/experience.actions";
import {loadLanguages} from "../../store/actions/language.actions";
import {loadSkills} from "../../store/actions/skill.actions";
import {loadCertificates} from "../../store/actions/certificate.actions";
import {SkillItem} from "../../models/skillItem/skillItem";
import {selectMySkillItems} from "../../selectors/skillItem.selector";
import {loadSkillItems} from "../../store/actions/skillItem.actions";
import {loadCandidates} from "../../store/actions/user.actions";
import {UserPagination} from "../../models/user/user-pagination";
import {selectMyCandidates} from "../../selectors/user.selector";
import {candidateId} from "../../selectors/auth.selector";
import {companyId} from "../../selectors/auth.selector";
import {FormBuilder, Validators} from "@angular/forms";



@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss']
})
export class CvTemplateComponent implements OnInit {


  scale: string = '';
  height: number | undefined;

  scaleForm = this.fb.group({
    scale: "1",
  })

  faPencil = faPencil
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

  candidates$: Observable<UserPagination | null> = this.candidateStore.select(selectMyCandidates);
  myCandidate$: Observable<User | undefined> = this.candidates$.pipe(
    filter((candidates): candidates is UserPagination => candidates !== undefined),
    map(candidates => candidates?.content.find(candidate => candidate.candidateId === Number(candidateId))));

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

  skillItems$: Observable<SkillItem[] | null> = this.skillItemStore.select(selectMySkillItems);

  company: boolean = false;

  constructor(
               private fb: FormBuilder,
               private authStore: Store<{ user: User }>,
               private educationStore: Store<{ educations: EducationPagination}>,
               private experienceStore: Store<{ experiences: ExperiencePagination}>,
               private languageStore: Store<{ languages: LanguagePagination}>,
               private skillStore: Store<{ skills: SkillPagination}>,
               private certificateStore: Store<{ certificates: CertificatePagination}>,
               private skillItemStore: Store<{ skillItem: SkillItem[]}>,
               private candidateStore: Store<{candidate : User[]}>
  ) { }


  ngOnInit(): void {
    this.company = !!companyId
    this.candidateStore.dispatch(loadCandidates({page: 0, items: 999999999}));
    this.experienceStore.dispatch(loadExperiences({page: 0, items: 999999999}));
    this.educationStore.dispatch(loadEducations({page: 0, items: 999999999}));
    this.languageStore.dispatch(loadLanguages({page: 0, items: 999999999}));
    this.skillStore.dispatch(loadSkills({page: 0, items: 999999999}));
    this.certificateStore.dispatch(loadCertificates({page: 0, items: 999999999}));


    this.skillItemStore.dispatch(loadSkillItems());
    this.skillItems$.pipe(take(1)).subscribe();
    this.myEducations$.pipe(take(1)).subscribe();
    this.myExperiences$.pipe(take(1)).subscribe();
    this.myLanguages$.pipe(take(1)).subscribe();
    this.mySkills$.pipe(take(1)).subscribe();
    this.myCertificates$.pipe(take(1)).subscribe();
    this.myCandidate$.pipe(take(1)).subscribe();
  }


  setScale(): void {
    this.scale = this.scaleForm.value.scale;
    this.setHeight();
  }

  setHeight(): void {
    const cv = document.getElementById("cv")
    if (cv != null) {
      this.height = cv.clientHeight*parseFloat(this.scale);
    }
  }

}
