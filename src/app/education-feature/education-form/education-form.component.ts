import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Education} from "../../models/education";
import {Store} from "@ngrx/store";
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  educations$: Observable<Education[]> = this.store.select(state => state.educations)

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

  constructor(private fb: FormBuilder ,private store: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.warn(this.educationForm.value)

  }
}
