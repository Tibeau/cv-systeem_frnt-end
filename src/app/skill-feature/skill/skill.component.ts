import { Component, OnInit } from '@angular/core';
import {filter, Observable, take} from "rxjs";
import {SkillPagination} from "../../models/skill/skill-pagination";
import {selectMySkills} from "../../selectors/skill.selector";
import {Skill} from "../../models/skill/skill";
import {map} from "rxjs/operators";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { faPencil, faTrashCan, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {Store} from "@ngrx/store";
import {candidateId} from "../../selectors/auth.selector";
import {changeSkill, loadSkills, removeSkill} from "../../store/actions/skill.actions";
import {SkillItem} from "../../models/skillItem/skillItem";
import {selectMySkillItems} from "../../selectors/skillItem.selector";
import {loadSkillItems} from "../../store/actions/skillItem.actions";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {


  skills$: Observable<SkillPagination | null> = this.skillStore.select(selectMySkills);
  mySkills$: Observable<Skill[]> = this.skills$.pipe(
    filter((skills): skills is SkillPagination => skills !== undefined),
    map(skills => skills?.content));
  skillItems$: Observable<SkillItem[] | null> = this.skillItemStore.select(selectMySkillItems);


  faPencil = faPencil
  faTrashCan = faTrashCan
  faXmark = faXmark
  faTriangleExclamation = faTriangleExclamation;

  active: boolean = false;
  showModal: boolean = false;

  currentPage = 0;
  pageAmountSub$: Observable<number> = this.skills$.pipe(
    filter((skill): skill is SkillPagination => skill !== undefined),
    map(skills => skills?.totalPages));
  pageAmount: number = 0;

  skillForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    active: [false, Validators.required],
    candidateId: [candidateId, Validators.required]
  })

  constructor(private router: Router, private fb: FormBuilder, private skillStore: Store<{ skills: SkillPagination }>, private skillItemStore: Store<{ skillItems: SkillItem[] }>) {
  }

  ngOnInit(): void {
    this.skillStore.dispatch(loadSkills({page: this.currentPage, items: 3}));
    this.skillItemStore.dispatch(loadSkillItems());
    this.mySkills$.pipe(take(1)).subscribe();
    this.skillItems$.pipe(take(1)).subscribe();
    this.pageAmountSub$.subscribe((page:number) => {this.pageAmount = page})
  }

  onEdit(skill: Skill) {
    this.router.navigate([`/skillform/${skill.id}`]);
  }
  onAdd(){
    this.router.navigate(['/skillform']);
  }

  onRemove(myId: number) {
    this.showModal = false;
    this.skillStore.dispatch(removeSkill({id: myId}));
  }

  showDeleteModal(mySkill: Skill){
    this.skillForm.setValue(mySkill);
    this.showModal = true;
  }

  closeDeleteModal(modal: boolean){
    this.showModal = modal;
  }

  toggleActive(mySkill: Skill){
    this.active = mySkill.active
    this.skillForm.setValue(mySkill)
    this.active = !this.active;
    this.skillForm.patchValue({ active: this.active })
    this.skillStore.dispatch(changeSkill({skill: this.skillForm.value, id: mySkill.id}));
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.skillStore.dispatch(loadSkills({page: this.currentPage, items: 3}));
  }

}
