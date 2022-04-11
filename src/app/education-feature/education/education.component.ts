import { Component, OnInit } from '@angular/core';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {Education} from "../../models/education";
import {Store} from '@ngrx/store';
import {selectMyEducations} from "../education.selector";
import {Router} from "@angular/router";
import {loadEducations, changeEducation, removeEducation} from "../../store/actions/education.actions";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations$: Observable<Education[] | null> = this.educationStore.select(selectMyEducations);
  faPencil = faPencil
  faTrashCan = faTrashCan
  active: boolean = false;

  educationForm = this.fb.group({
    id: [0, Validators.required],
    diploma: ['', Validators.required],
    description: ['', Validators.required],
    school: ['', Validators.required],
    fieldOfStudy: ['', Validators.required],
    country: ['', Validators.required],
    website: ['', Validators.required],
    street: ['', Validators.required],
    number: [0, Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    postalCode: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    active: [false, Validators.required],
    candidateId: ['', Validators.required]
  })

  constructor(private router: Router, private fb: FormBuilder, private educationStore: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
    this.educationStore.dispatch(loadEducations());
    this.educations$.subscribe()
  }

  onEdit(education: Education) {
    this.router.navigate(['/educationform/' + education.id]);
  }
  onAdd(){
    this.router.navigate(['/educationform']);
  }

  onRemove(myId: number) {
    this.educationStore.dispatch(removeEducation({id: myId}));
  }

  toggleActive(myEducation: Education){
    this.active = myEducation.active
    this.educationForm.setValue(myEducation)
    if (this.active){
      this.active = false
      console.log("active set to false")
    } else {
      this.active = true
      console.log("active set to true")
    }
    this.educationForm.patchValue({
      active: this.active,
    })
    this.educationStore.dispatch(changeEducation({education: this.educationForm.value, id: myEducation.id}));
  }
}
