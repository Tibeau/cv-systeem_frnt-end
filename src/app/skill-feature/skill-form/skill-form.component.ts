import { Component, OnInit } from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {filter, Observable, take} from "rxjs";
import {Skill} from "../../models/skill/skill";
import {selectMySkills} from "../../skill-feature/skill.selector";
import {map} from "rxjs/operators";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomeDateValidators} from "../../shared/directives/date-validation.directive";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {addSkill, changeSkill} from "../../store/actions/skill.actions";


@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
  skill$: Observable<Skill | undefined> = this.skillStore.select(selectMySkills)
    .pipe(map(skills => skills?.content.find(skill => skill.id == this.skillId)));

  faArrowLeft = faArrowLeft;
  mode: string = "";
  skillId: number = 0;
  candidateId: number = Number(localStorage.getItem("id"));
  currentPage = 0;
  isCancel: boolean = false;
  skillUrl: string = "/skills"

  skillForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    active: [false, Validators.required],
    candidateId: ['', Validators.required]
  })

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private skillStore: Store<{ skills: Skill[] }>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => this.skillId = params['id']);


    if (this.skillId) {
      this.mode = "edit";
      this.skill$.pipe(
        filter((skill): skill is Skill => skill !== undefined),
        take(1)).subscribe((skill) => {
        this.skillForm.setValue({...skill})
      });
    } else {
      this.mode = "add";
    }
  }

  onSubmit(): void {
    if (!this.skillForm.valid && !this.isCancel) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
      if ( this.mode === "add") {
        this.skillStore.dispatch(addSkill({skill: this.skillForm.value}));
      } else if (this.mode === "edit") {
        this.skillStore.dispatch(changeSkill({skill: this.skillForm.value, id: this.skillId}));
      }
      this.router.navigate([this.skillUrl]);
    }

  }

  cancel(){
    this.isCancel = true
    this.router.navigate([this.skillUrl]);
  }

}
