import { Component, OnInit } from '@angular/core';
import {filter, Observable, take} from "rxjs";
import {EducationPagination} from "../../models/education/education-pagination";
import {selectMyEducations} from "../../selectors/education.selector";
import {Education} from "../../models/education/education";
import {map} from "rxjs/operators";
import {ExperiencePagination} from "../../models/experience/experience-pagination";
import {selectMyExperiences} from "../../selectors/experience.selector";
import {Experience} from "../../models/experience/experience";
import {LanguagePagination} from "../../models/language/language-pagination";
import {selectMyLanguages} from "../../selectors/language.selector";
import {Language} from "../../models/language/language";
import {SkillPagination} from "../../models/skill/skill-pagination";
import {selectMySkills} from "../../selectors/skill.selector";
import {Skill} from "../../models/skill/skill";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";
import {selectMyCertificates} from "../../selectors/certificate.selector";
import {Certificate} from "../../models/certificate/certificate";
import {SkillItem} from "../../models/skillItem/skillItem";
import {selectMySkillItems} from "../../selectors/skillItem.selector";
import {Store} from "@ngrx/store";
import {loadSkillItems} from "../../store/actions/skillItem.actions";
import { faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cv-items',
  templateUrl: './cv-items.component.html',
  styleUrls: ['./cv-items.component.scss']
})
export class CvItemsComponent implements OnInit {
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

  active: boolean = false;
  faPencil = faPencil


  constructor(
               private educationStore: Store<{ educations: EducationPagination}>,
               private experienceStore: Store<{ experiences: ExperiencePagination}>,
               private languageStore: Store<{ languages: LanguagePagination}>,
               private skillStore: Store<{ skills: SkillPagination}>,
               private certificateStore: Store<{ certificates: CertificatePagination}>,
               private skillItemStore: Store<{ skillItem: SkillItem[]}>
  ) { }


  ngOnInit(): void {
    this.skillItemStore.dispatch(loadSkillItems());
    this.skillItems$.pipe(take(1)).subscribe();
    this.myEducations$.pipe(take(1)).subscribe();
    this.myExperiences$.pipe(take(1)).subscribe();
    this.myLanguages$.pipe(take(1)).subscribe();
    this.mySkills$.pipe(take(1)).subscribe();
    this.myCertificates$.pipe(take(1)).subscribe();
  }

}
