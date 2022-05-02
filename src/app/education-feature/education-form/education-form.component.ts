import {Component, OnInit} from '@angular/core';
import {filter, Observable,take, tap} from "rxjs";
import {Education} from "../../models/education/education";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Store} from "@ngrx/store";
import { FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {selectMyEducations} from "../education.selector";
import {map} from "rxjs/operators";
import {addEducation, changeEducation} from "../../store/actions/education.actions";
import {
  CustomeDateValidators,
} from "../../shared/directives/date-validation.directive";

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  education$: Observable<Education | undefined> = this.educationStore.select(selectMyEducations)
    .pipe(map(educations => educations?.content.find(education => education.id == this.educationId)));

  faArrowLeft = faArrowLeft;
  mode: string = "";
  educationId: number = 0;
  candidateId: number = Number(localStorage.getItem("id"));
  currentPage = 0;
  isCancel: boolean = false;
  educationUrl: string = "/educations"

  educationForm = this.fb.group({
    id: [0, Validators.required,],
    diploma: ['', [Validators.required,]],
    description: [''],
    school: ['', Validators.required],
    fieldOfStudy: ['', Validators.required],
    country: ['', Validators.required],
    website: [''],
    startDate: ['', Validators.required,],
    endDate: ['', Validators.required],
    active: [true, Validators.required],
    candidateId: [this.candidateId, Validators.required]
  }, {Validator: [CustomeDateValidators.invalidDateValidator('startDate', 'endDate')]})

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private educationStore: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => this.educationId = params['id']);


    if (this.educationId) {
      this.mode = "edit";
      this.education$.pipe(
        filter((education): education is Education => education !== undefined),
        take(1)).subscribe((education) => {
        this.educationForm.setValue({...education})
      });
    } else {
      this.mode = "add";
    }
  }

  onSubmit(): void {
    if (!this.educationForm.valid && !this.isCancel) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
      if ( this.mode === "add") {
        this.educationStore.dispatch(addEducation({education: this.educationForm.value}));
      } else if (this.mode === "edit") {
        this.educationStore.dispatch(changeEducation({education: this.educationForm.value, id: this.educationId}));
      }
      this.router.navigate([this.educationUrl]);
    }

  }

  cancel(){
    this.isCancel = true
    this.router.navigate([this.educationUrl]);
  }
}
