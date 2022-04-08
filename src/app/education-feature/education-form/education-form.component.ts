import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Education} from "../../models/education";
import { Store} from "@ngrx/store";
import { FormBuilder, Validators} from "@angular/forms";
import * as educationActions from "../../store/actions/education.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {selectMyEducations} from "../education.selector";
import {map} from "rxjs/operators";
import {createEducation, putEducation} from "../../store/actions/education.actions";

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  education$: Observable<Education | undefined> = this.educationStore.select(selectMyEducations)
    .pipe(map(educations => educations?.find(education => education.id == this.educationId)));
  education: Education= {
    active: false,
    candidateId: 0,
    city: "",
    country: "",
    description: "",
    diploma: "",
    endDate: "",
    fieldOfStudy: "",
    id: 0,
    number: 0,
    postalCode: "",
    school: "",
    startDate: "",
    street: "",
    website: ""
  };

  isAdd: boolean = false;
  isEdit: boolean = false;
  educationId: number = 0;
  isActive: boolean = false

  educationForm = this.fb.group({
      diploma: ['', Validators.required],
      description: ['', Validators.required],
      school: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      country: ['', Validators.required],
      website: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['',Validators.required ],
      startDate: ['',Validators.required ],
      endDate: ['',Validators.required],
      active: [false,Validators.required],
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder ,private educationStore: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.educationId = params['id']);
    this.educationStore.dispatch({type: educationActions.EducationActionTypes.GET_EDUCATIONS});


    if (this.educationId){
    this.isEdit = true
      this.education$.subscribe( (e: Education | undefined) => this.educationForm.setValue({
        diploma: e?.diploma,
        description: e?.description,
        school: e?.school,
        fieldOfStudy: e?.fieldOfStudy,
        country: e?.country,
        website: e?.website,
        street: e?.street,
        number: e?.number,
        city: e?.city,
        province: e?.website,
        postalCode: e?.postalCode,
        startDate: e?.startDate,
        endDate: e?.endDate,
        active: e?.active,
      }));
    }else {
      this.isAdd = true
    }
      console.log("add " + this.isAdd,"edit " + this.isEdit, "id " + this.educationId)
      console.log(this.education$)
  }

  onSubmit(): void{
    this.education = {active: this.educationForm.value.active,
      candidateId: Number(localStorage.getItem('id' || 0)),
      city: this.educationForm.value.city,
      country: this.educationForm.value.country,
      description: this.educationForm.value.description,
      diploma: this.educationForm.value.diploma,
      endDate: this.educationForm.value.endDate,
      fieldOfStudy: this.educationForm.value.fieldOfStudy,
      id: 0,
      number: Number(this.educationForm.value.number),
      postalCode: this.educationForm.value.postalCode,
      school: this.educationForm.value.school,
      startDate: this.educationForm.value.startDate,
      street: this.educationForm.value.street,
      website: this.educationForm.value.website}
    console.log(this.education)

    if (this.isAdd){
      console.warn("added ")
      console.log(this.education)
      this.educationStore.dispatch(createEducation({education: this.education}));
    } else if (this.isEdit){
      console.warn("changed ")
      console.warn(this.education)
      console.warn(this.educationId)
      this.educationStore.dispatch(putEducation({education: this.education, id: this.educationId}));
    }
    this.router.navigate(['/educations']).then(() => {
      window.location.reload();
  });
  }
}
