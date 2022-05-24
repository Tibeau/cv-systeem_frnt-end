import {Component, OnDestroy, OnInit} from '@angular/core';
import {candidateId, companyId} from "../../selectors/auth.selector";
import {filter, Observable, Subject, take} from "rxjs";
import {User} from "../../security/user";
import {Store} from "@ngrx/store";
import {generateTemplate} from "../../pdfTemplate/pdf.template";
import {UserPagination} from "../../models/user/user-pagination";
import {selectMyCandidates} from "../../selectors/user.selector";
import {map} from "rxjs/operators";
import {EducationPagination} from "../../models/education/education-pagination";
import {selectMyEducations} from "../../selectors/education.selector";
import {Education} from "../../models/education/education";
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
import {FormBuilder} from "@angular/forms";
import {loadCandidates} from "../../store/actions/user.actions";
import {loadExperiences} from "../../store/actions/experience.actions";
import {loadEducations} from "../../store/actions/education.actions";
import {loadLanguages} from "../../store/actions/language.actions";
import {loadSkills} from "../../store/actions/skill.actions";
import {loadCertificates} from "../../store/actions/certificate.actions";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  candidate: boolean = !!candidateId;
  company: boolean = !!companyId;

  candidates$: Observable<UserPagination | null> = this.candidateStore.select(selectMyCandidates);
  myCandidate$: Observable<User | undefined> = this.candidates$.pipe(
    map(candidates => candidates?.content.find(candidate => candidate.candidateId === Number(candidateId))),
    filter((candidates): candidates is User => candidates !== undefined),);

  educations$: Observable<EducationPagination | null> = this.educationStore.select(selectMyEducations);
  myEducations$: Observable<Education[]> = this.educations$.pipe(
    map(educations => educations?.content.filter(educations => educations.active === true)),
    filter((educations): educations is Education[] => educations !== undefined),
  );

  experiences$: Observable<ExperiencePagination | null> = this.experienceStore.select(selectMyExperiences);
  myExperiences$: Observable<Experience[]> = this.experiences$.pipe(
    map(experiences => experiences?.content.filter(experiences => experiences.active === true)),
    filter((experiences): experiences is Experience[] => experiences !== undefined),);

  languages$: Observable<LanguagePagination | null> = this.languageStore.select(selectMyLanguages);
  myLanguages$: Observable<Language[]> = this.languages$.pipe(
    map(languages => languages?.content.filter(languages => languages.active === true)),
    filter((languages): languages is Language[] => languages !== undefined),);

  skills$: Observable<SkillPagination | null> = this.skillStore.select(selectMySkills);
  mySkills$: Observable<Skill[]> = this.skills$.pipe(
    map(skills => skills?.content.filter(skills => skills.active === true)),
    filter((skills): skills is Skill[] => skills !== undefined),);

  certificates$: Observable<CertificatePagination | null> = this.certificateStore.select(selectMyCertificates);
  myCertificates$: Observable<Certificate[]> = this.certificates$.pipe(
    map(certificates => certificates?.content.filter(certificates => certificates.active === true)),
    filter((certificates): certificates is Certificate[] => certificates !== undefined),
  );


  ngDestroyed$ = new Subject();
  user: User | undefined;
  certificates: Certificate[] | undefined;
  skills: Skill[] | undefined;
  languages: Language[] | undefined;
  experiences: Experience[] | undefined;
  educations: Education[] | undefined;


  constructor(
    private fb: FormBuilder,
    private authStore: Store<{ user: User }>,
    private educationStore: Store<{ educations: EducationPagination }>,
    private experienceStore: Store<{ experiences: ExperiencePagination }>,
    private languageStore: Store<{ languages: LanguagePagination }>,
    private skillStore: Store<{ skills: SkillPagination }>,
    private certificateStore: Store<{ certificates: CertificatePagination }>,
    private candidateStore: Store<{ candidate: User[] }>) {
  }

  ngOnInit(): void {
    if (candidateId) {

      this.candidateStore.dispatch(loadCandidates({page: 0, items: 999999999}));
      this.experienceStore.dispatch(loadExperiences({page: 0, items: 999999999}));
      this.educationStore.dispatch(loadEducations({page: 0, items: 999999999}));
      this.languageStore.dispatch(loadLanguages({page: 0, items: 999999999}));
      this.skillStore.dispatch(loadSkills({page: 0, items: 999999999}));
      this.certificateStore.dispatch(loadCertificates({page: 0, items: 999999999}));

      this.myEducations$.pipe(take(1)).subscribe(
        educations => {
          this.educations = educations
          console.log(this.educations)
        }
      );
      this.myExperiences$.pipe(take(1)).subscribe(
        experiences => {
          this.experiences = experiences
          console.log(this.experiences)
        }
      );
      this.myLanguages$.pipe(take(1)).subscribe(
        languages => {
          this.languages = languages
          console.log(this.languages)
        }
      );
      this.mySkills$.pipe(take(1)).subscribe(
        skills => {
          this.skills = skills
          console.log(this.skills)
        }
      );

      this.myCertificates$.pipe(take(1)).subscribe(
        certificates => {
          this.certificates = certificates
          console.log(this.certificates)
        }
      );

      this.myCandidate$.pipe(take(1)).subscribe(
        user => {
          this.user = user
          console.log(this.user)
        }
      );


      setTimeout(() => {
        this.generatePdf()
      }, 1000);
    }
  }

  //
  // ngOnDestroy(): void {
  //   //this.ngDestroyed$.next();
  //   this.ngDestroyed$.complete();
  // }


  generatePdf(): void {
    const iframe: HTMLIFrameElement | null = document.querySelector('.cv-viewer');
    const generatedPdf = pdfMake.createPdf(generateTemplate(this.user, this.educations, this.certificates, this.experiences, this.languages, this.skills));

    // generatedPdf.docDefinition.content[0].splice(1, 0, {
    //   absolutePosition: { x: 410, y: 20 },
    //   canvas: [
    //     {
    //       type: 'rect',
    //       x: -1,
    //       y: -1,
    //       w: 127,
    //       h: 127,
    //       r: 3,
    //       lineColor: 'white',
    //       lineWidth: 10,
    //     },
    //   ]
    // });

    // observable return
    //
    // const targetElement = document.querySelector('#pdf-container');
    // targetElement.innerHTML = '';
    // const iframe = document.createElement('iframe');
    // targetElement.appendChild(iframe);
    generatedPdf.open({}, iframe?.contentWindow);
  }
}
