import {Component, OnInit} from '@angular/core';
import {filter, Observable,take, tap} from "rxjs";
import {Education} from "../../models/education";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Store} from "@ngrx/store";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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
    .pipe(map(educations => educations?.content.find(education => education.id == this.educationId)));

  faArrowLeft = faArrowLeft;
  mode: string = "";
  educationId: number = 0;
  candidateId: number = Number(localStorage.getItem("id"));

  educationForm = this.fb.group({
    id: [0, Validators.required,],
    diploma: ['', [Validators.required,]],
    description: [''],
    school: ['', Validators.required],
    fieldOfStudy: ['', Validators.required],
    country: ['', Validators.required],
    website: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    active: [true, Validators.required],
    candidateId: [this.candidateId, Validators.required]
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private educationStore: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.educationId = params['id']);
    this.educationStore.dispatch(loadEducations({page: 0}));

    if (this.educationId) {
      this.mode = "edit";
      this.education$.pipe(
        filter((education): education is Education => education !== undefined),
        tap((education) => {
          this.educationForm.setValue({...education})
        }),
        take(1)).subscribe();
    } else {
      this.mode = "add";
    }
  }

  onSubmit(): void {
    if ( this.mode === "add") {
      this.educationStore.dispatch(addEducation({education: this.educationForm.value}));
    } else if (this.mode === "edit") {
      this.educationStore.dispatch(changeEducation({education: this.educationForm.value, id: this.educationId}));
    }
    this.router.navigate(['/educations']);
  }

  cancel(){
    this.router.navigate(['/educations']);
  }
}
