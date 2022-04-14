import { Component, OnInit } from '@angular/core';
import { faPencil, faTrashCan, faXmark, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {filter, Observable} from "rxjs";
import {Education} from "../../models/education";
import {Store} from '@ngrx/store';
import {selectMyEducations} from "../education.selector";
import {Router} from "@angular/router";
import {loadEducations, changeEducation, removeEducation} from "../../store/actions/education.actions";
import {FormBuilder, Validators} from "@angular/forms";
import {EducationPagination} from "../../models/education-pagination";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  educations$: Observable<EducationPagination | null> = this.educationStore.select(selectMyEducations);
  myEducations$: Observable<Education[]> = this.educations$.pipe(
    filter((education): education is EducationPagination => education !== undefined),
    map(educations => educations?.content));
  faPencil = faPencil
  faTrashCan = faTrashCan
  faXmark = faXmark

  faTriangleExclamation = faTriangleExclamation;
  active: boolean = false;
  showModal: boolean = false;

  currentPage = 0;

  educationForm = this.fb.group({
    id: [0, Validators.required],
    diploma: ['', Validators.required],
    description: ['', Validators.required],
    school: ['', Validators.required],
    fieldOfStudy: ['', Validators.required],
    country: ['', Validators.required],
    website: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    active: [false, Validators.required],
    candidateId: ['', Validators.required]
  })

  constructor(private router: Router, private fb: FormBuilder, private educationStore: Store<{ educations: EducationPagination }>) {
  }

  ngOnInit(): void {
    this.educationStore.dispatch(loadEducations({page: this.currentPage}));
    this.myEducations$.subscribe()
  }

  onEdit(education: Education) {
    this.router.navigate(['/educationform/' + education.id]);
  }
  onAdd(){
    this.router.navigate(['/educationform']);
  }

  onRemove(myId: number) {
    this.showModal = false;
    this.educationStore.dispatch(removeEducation({id: myId}));
  }

  showDeleteModal(myEducation: Education){
    this.educationForm.setValue(myEducation);
    this.showModal = true;
  }

 closeDeleteModal(){
    this.showModal = false;
  }

  toggleActive(myEducation: Education){
    this.active = myEducation.active
    this.educationForm.setValue(myEducation)
    this.active = !this.active;
    this.educationForm.patchValue({ active: this.active })
    this.educationStore.dispatch(changeEducation({education: this.educationForm.value, id: myEducation.id}));
  }

  pageChanged(event: number) {
    this.currentPage = event;
    console.log(event)
    this.educationStore.dispatch(loadEducations({page: 1}));
  }
}
