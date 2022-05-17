import { Component, OnInit } from '@angular/core';
import {filter, Observable, take} from "rxjs";
import {candidateId} from "../../selectors/auth.selector";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {map} from "rxjs/operators";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectMyExperiences} from "../../selectors/experience.selector";
import {Experience} from "../../models/experience/experience";
import {addExperience, changeExperience} from "../../store/actions/experience.actions";

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {
  experience$: Observable<Experience | undefined> = this.experienceStore.select(selectMyExperiences)
    .pipe(map(experiences => experiences?.content.find(experience => experience.id == this.experienceId)));

  faArrowLeft = faArrowLeft;
  mode: string = "";
  experienceId: number = 0;
  currentPage = 0;
  isCancel: boolean = false;
 experienceUrl: string = "/experiences"

  experienceForm = this.fb.group({
    id: [0, Validators.required],
    description: [''],
    profession: ['', Validators.required],
    employer: ['', Validators.required],
    company: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    active: [true, Validators.required],
    candidateId: [candidateId, Validators.required]
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private experienceStore: Store<{ experiences: Experience[] }>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => this.experienceId = params['id']);

    if (this.experienceId) {
      this.mode = "edit";
      this.experience$.pipe(
        filter((experience): experience is Experience => experience !== undefined),
        take(1)).subscribe((experience) => {
        this.experienceForm.setValue({...experience})
      });
    } else {
      this.mode = "add";
    }
  }

  onSubmit(): void {
    if (!this.experienceForm.valid && !this.isCancel) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
      if ( this.mode === "add") {
        this.experienceStore.dispatch(addExperience({experience: this.experienceForm.value}));
      } else if (this.mode === "edit") {
        this.experienceStore.dispatch(changeExperience({experience: this.experienceForm.value, id: this.experienceId}));
      }
      this.router.navigate([this.experienceUrl]);
    }

  }

  cancel(){
    this.isCancel = true
    this.router.navigate([this.experienceUrl]);
  }

}
