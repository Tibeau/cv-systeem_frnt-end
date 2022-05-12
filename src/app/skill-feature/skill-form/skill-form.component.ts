import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faPencil} from '@fortawesome/free-solid-svg-icons';
import {filter, Observable, take} from "rxjs";
import {Skill} from "../../models/skill/skill";
import {selectMySkills} from "../../skill-feature/skill.selector";
import {map} from "rxjs/operators";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomeDateValidators} from "../../shared/directives/date-validation.directive";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {addSkill, changeSkill} from "../../store/actions/skill.actions";
import {SkillItem} from "../../models/skillItem/skillItem";
import {addSkillItem, loadSkillItems} from "../../store/actions/skillItem.actions";
import {selectMySkillItems} from "../skillItem.selector";


@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
  skill$: Observable<Skill | undefined> = this.skillStore.select(selectMySkills)
    .pipe(map(skills => skills?.content.find(skill => skill.id == this.skillId)));
  skillItems$: Observable<SkillItem[] | null> = this.skillItemStore.select(selectMySkillItems);

  faPencil = faPencil;
  faArrowLeft = faArrowLeft;
  editSkillIem: boolean = false;
  mode: string = "";
  skillId: number = 0;
  candidateId: number = Number(localStorage.getItem("CANDIDATE"));
  currentPage = 0;
  isCancel: boolean = false;
  skillUrl: string = "/skills"

  skillForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    active: [true, Validators.required],
    candidateId: [this.candidateId, Validators.required]
  });


  skillItemForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    skillId: [this.skillId, Validators.required],
    candidateId: [this.candidateId, Validators.required]
  });

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private skillStore: Store<{ skills: Skill[] }>, private skillItemStore: Store<{ skillItems: SkillItem[] }>) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: Params) => this.skillId = params['id']);

    if (this.skillId) {
      this.mode = "edit";
      this.skillItemStore.dispatch(loadSkillItems());
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

  onEdit(skillItem: SkillItem) {
    this.skillItemForm.setValue(skillItem)
    this.editSkillIem = true
  }

  onAdd() {
    this.editSkillIem = true
  }

  onClose() {
    this.editSkillIem = false
  }

  onSkillItemSubmit() {
    this.skillStore.dispatch(addSkillItem({skillItem: this.skillItemForm.value}));
    this.onClose()
  }

}
