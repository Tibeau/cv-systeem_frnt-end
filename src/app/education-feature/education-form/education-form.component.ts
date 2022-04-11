import {Component, OnInit} from '@angular/core';
import {filter, Observable, Subscription, take, tap} from "rxjs";
import {Education} from "../../models/education";
import {Store} from "@ngrx/store";
import {FormBuilder, Validators} from "@angular/forms";
import * as educationActions from "../../store/actions/education.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {selectMyEducations} from "../education.selector";
import {map} from "rxjs/operators";
import {addEducation, changeEducation, loadEducations} from "../../store/actions/education.actions";

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  education$: Observable<Education | undefined> = this.educationStore.select(selectMyEducations)
    .pipe(map(educations => educations?.find(education => education.id == this.educationId)));

  isAdd: boolean = false;
  isEdit: boolean = false;
  educationId: number = 0;
  isActive: boolean = false
  candidateId: number = Number(localStorage.getItem("id"));

  educationForm = this.fb.group({
    id: [0, Validators.required],
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
    postalCode: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    active: [true, Validators.required],
    candidateId: [this.candidateId, Validators.required]
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private educationStore: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.educationId = params['id']);
    this.educationStore.dispatch(loadEducations());

    if (this.educationId) {
      this.isEdit = true
      this.education$.pipe(
        filter((education): education is Education => education !== undefined),
        tap((education) => {
          this.educationForm.setValue({...education})
        }),
        take(1)).subscribe();
    } else {
      this.isAdd = true
    }
    console.log("add " + this.isAdd, "edit " + this.isEdit, "id " + this.educationId)
  }

  onSubmit(): void {
    if (this.isAdd) {
      this.educationStore.dispatch(addEducation({education: this.educationForm.value}));

    } else if (this.isEdit) {
      this.educationStore.dispatch(changeEducation({education: this.educationForm.value, id: this.educationId}));
    }
    this.router.navigate(['/educations']);
  }
}
