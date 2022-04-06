import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Education} from "../../models/education";
import {select, Store} from "@ngrx/store";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import * as educationActions from "../../store/actions/education.actions";
import {selectMyEducation} from "../education.selector";
import {Router} from "@angular/router";
import {FormState} from "../../models/formState";
import {setEditFormState} from "../../store/actions/formState.actions";

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  education$: Observable<Education | null> = this.store.select(selectMyEducation)
  formState$: Observable<FormState> = this.formStore.select( state => state.formState)



  isAdd: boolean = false;
  isEdit: boolean = false;
  educationId: number = 2;

  educationForm = this.fb.group({
      diploma: ['', Validators.required],
      description: ['', Validators.required],
      school: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      country: ['', Validators.required],
      website: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['',Validators.required ],
      startDate: ['',Validators.required ],
      endDate: ['',Validators.required],
  })

  constructor(private fb: FormBuilder ,private store: Store<{ education: Education}>, private formStore: Store<{formState: FormState}>) {
  }

  ngOnInit(): void {
    console.log("start store dispatch")
    //this.formState$.subscribe( formState =>  console.log(formState.id))
    this.store.dispatch({type: educationActions.EducationActionTypes.GET_EDUCATION, id: "3"});
    this.education$.subscribe( e => this.educationForm.setValue({
      diploma: e?.diploma,
      description: e?.description,
      school: e?.school,
      fieldOfStudy: e?.fieldOfStudy,
      country: e?.country,
      website: e?.website,
      streetAddress: e?.street,
      city: e?.city,
      province: e?.website,
      postalCode: e?.postalCode,
      startDate: e?.startDate,
      endDate: e?.endDate,
    }));
    console.log(this.education$)
  }

  onSubmit(): void{
    console.warn(this.educationForm.value)

  }
}
