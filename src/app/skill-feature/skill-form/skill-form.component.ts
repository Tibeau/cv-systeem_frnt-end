import {Component, OnInit} from '@angular/core';
import {faArrowLeft, faPencil} from '@fortawesome/free-solid-svg-icons';
import {filter, Observable, take} from "rxjs";
import {Skill} from "../../models/skill/skill";
import {selectMySkills} from "../../selectors/skill.selector";
import {map} from "rxjs/operators";
import {candidateId} from "../../selectors/auth.selector";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ActionsSubject, Store} from "@ngrx/store";
import {
  addSkill,
  addSkillSuccess,
  changeSkill,
  changeSkillSuccess,
  loadSkills
} from "../../store/actions/skill.actions";
import {SkillItem} from "../../models/skillItem/skillItem";
import {addSkillItem, changeSkillItem, loadSkillItems} from "../../store/actions/skillItem.actions";
import {selectMySkillItems} from "../../selectors/skillItem.selector";
import {ofType} from "@ngrx/effects";


@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
  skillItems$: Observable<SkillItem[] | null> = this.skillItemStore.select(selectMySkillItems);
  faPencil = faPencil;
  faArrowLeft = faArrowLeft;
  skillItemMode: string = "";
  skillMode: string = "";
  skillId: number = 0;
  skill$: Observable<Skill | undefined> = this.skillStore.select(selectMySkills)
    .pipe(map(skills => skills?.content.find(skill => skill.id == this.skillId)));
  currentPage = 0;
  isCancel: boolean = false;
  skillUrl: string = "/skills"

  skillForm = this.fb.group({
    id: [""],
    name: ['', Validators.required],
    description: [''],
    active: [true, Validators.required],
    candidateId: [candidateId, Validators.required]
  });

  skillItemForm = this.fb.group({
    id: [""],
    name: ['', Validators.required],
    description: [''],
    skillId: [this.skillId],
    candidateId: [candidateId, Validators.required]
  });

  skillItemEditForm = this.fb.group({
    id: [""],
    name: [''],
    description: [''],
    skillId: [""],
    candidateId: [""]
  });

  newSkillItems: SkillItem[] = []

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private skillStore: Store<{ skills: Skill[] }>,
              private skillItemStore: Store<{ skillItems: SkillItem[] }>,
              private actionsSubject$: ActionsSubject
  ) {
  }

  ngOnInit(): void {
    this.skillStore.dispatch(loadSkills({page: this.currentPage, items: 3}));
    this.skillItemStore.dispatch(loadSkillItems());
    this.route.params.pipe(take(1)).subscribe((params: Params) => this.skillId = params['id']);

    if (this.skillId) {
      this.skillMode = "edit";
      this.skillItemStore.dispatch(loadSkillItems());
      this.skill$.pipe(
        filter((skill): skill is Skill => skill !== undefined),
        take(1)).subscribe((skill) => {
        this.skillForm.setValue({...skill})
      });
    } else {
      this.skillMode = "add";
    }
  }

  onSubmit(): void {
    if (!this.skillForm.valid && !this.isCancel) {
      window.alert("please fill in all required fields before submitting the form");
    } else {
      if (this.skillMode === "add") {
        this.skillStore.dispatch(addSkill({skill: this.skillForm.value}));

        this.actionsSubject$.pipe(ofType(addSkillSuccess)).subscribe((data: any) => {
          console.log(data.skill)
          if (this.newSkillItems != []) {
            for (let item in this.newSkillItems) {
              this.newSkillItems[item].skillId = data.skill.id
              console.log(this.newSkillItems[item]);
              this.skillItemStore.dispatch(addSkillItem({skillItem: this.newSkillItems[item]}))
            }
          }
        })

      } else if (this.skillMode === "edit") {
        this.skillStore.dispatch(changeSkill({skill: this.skillForm.value, id: this.skillId}));

        this.actionsSubject$.pipe(ofType(changeSkillSuccess)).subscribe((data: any) => {
          if (this.newSkillItems != []) {
            for (let item in this.newSkillItems) {
              this.newSkillItems[item].skillId = data.skill.id
              console.log(this.newSkillItems[item]);
              this.skillItemStore.dispatch(addSkillItem({skillItem: this.newSkillItems[item]}))
            }
          }
        })

      }
      this.router.navigate([this.skillUrl]);
    }
  }

  cancel() {
    this.isCancel = true
    this.router.navigate([this.skillUrl]);
  }

  skillItemModal(skillItem: SkillItem) {
    this.skillItemForm.setValue(skillItem)
    this.skillItemMode = "edit"
  }

  newSkillItemModal(skillItem: SkillItem) {
    this.skillItemForm.setValue(skillItem);
    this.skillItemEditForm.setValue(skillItem);
    this.skillItemMode = "newEdit";

  }

  onAdd() {
    this.skillItemMode = "add"
  }

  onClose() {
    this.skillItemForm.patchValue({
      id: 0,
      name: "",
      description: "",
    })
    this.skillItemMode = ""
  }

  onSkillItemSubmit() {
    if (this.skillItemMode === "add") {
      this.newSkillItems.push(this.skillItemForm.value)
    } else if (this.skillItemMode === "edit") {
      this.skillItemStore.dispatch(changeSkillItem({
        skillItem: this.skillItemForm.value,
        id: this.skillItemForm.value.id
      }))
    } else if (this.skillItemMode === "newEdit") {
      this.newSkillItems.forEach((skillItem,index)=>{
        if(skillItem.name ===  this.skillItemEditForm.value.name) {
          this.newSkillItems.splice(index, 1);
        }
      });
      this.newSkillItems.push(this.skillItemForm.value)
    }


    this.onClose()
  }

}
