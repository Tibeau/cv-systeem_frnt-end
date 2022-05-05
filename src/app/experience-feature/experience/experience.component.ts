import { Component, OnInit } from '@angular/core';
import { faPencil, faTrashCan, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {filter, Observable, take} from "rxjs";
import {Store} from '@ngrx/store';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {ExperiencePagination} from "../../models/experience/experience-pagination";
import {selectMyExperiences} from "../experience.selector";
import {Experience} from "../../models/experience/experience";
import {changeExperience, loadExperiences, removeExperience} from "../../store/actions/experience.actions";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  experiences$: Observable<ExperiencePagination | null> = this.experienceStore.select(selectMyExperiences);
  myExperiences$: Observable<Experience[]> = this.experiences$.pipe(
    filter((experiences): experiences is ExperiencePagination => experiences !== undefined),
    map(experiences => experiences?.content));

  faPencil = faPencil
  faTrashCan = faTrashCan
  faXmark = faXmark
  faTriangleExclamation = faTriangleExclamation;

  active: boolean = false;
  showModal: boolean = false;

  currentPage = 0;
  pageAmountSub$: Observable<number> = this.experiences$.pipe(
    filter((experience): experience is ExperiencePagination => experience !== undefined),
    map(experiences => experiences?.totalPages));
  pageAmount: number = 0;

  experienceForm = this.fb.group({
    id: [0, Validators.required],
    description: ['', Validators.required],
    profession: ['', Validators.required],
    employer: ['', Validators.required],
    company: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    active: [false, Validators.required],
    candidateId: ['', Validators.required]
  })

  constructor(private router: Router, private fb: FormBuilder, private experienceStore: Store<{ experiences: ExperiencePagination }>) {
  }

  ngOnInit(): void {
    this.experienceStore.dispatch(loadExperiences({page: this.currentPage, items: 3}));
    this.myExperiences$.pipe(take(1)).subscribe();
    this.pageAmountSub$.subscribe((page:number) => {this.pageAmount = page})
  }

  onEdit(experience: Experience) {
    this.router.navigate([`/experienceform/${experience.id}`]);
  }
  onAdd(){
    this.router.navigate(['/experienceform']);
  }

  onRemove(myId: number) {
    this.showModal = false;
    this.experienceStore.dispatch(removeExperience({id: myId}));
  }

  showDeleteModal(myExperience: Experience){
    this.experienceForm.setValue(myExperience);
    this.showModal = true;
  }

  closeDeleteModal(modal: boolean){
    this.showModal = modal;
  }

  toggleActive(myExperience: Experience){
    this.active = myExperience.active
    this.experienceForm.setValue(myExperience)
    this.active = !this.active;
    this.experienceForm.patchValue({ active: this.active })
    this.experienceStore.dispatch(changeExperience({experience: this.experienceForm.value, id: myExperience.id}));
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.experienceStore.dispatch(loadExperiences({page: this.currentPage, items: 3}));
  }

}
