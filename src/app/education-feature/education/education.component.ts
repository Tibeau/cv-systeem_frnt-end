import { Component, OnInit } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {Education} from "../../models/education";
import {select, Store} from '@ngrx/store';
import * as educationActions from "../../store/actions/education.actions"
import {selectMyEducations} from "../education.selector";
import {Router} from "@angular/router";
import {putEducation} from "../../store/actions/education.actions";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations$: Observable<Education[] | null> = this.educationStore.select(selectMyEducations);
  faPencil = faPencil

  constructor(private router: Router, private educationStore: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
    debugger;
    this.educationStore.dispatch({type: educationActions.EducationActionTypes.GET_EDUCATIONS});
    this.educations$.subscribe()
  }

  onEdit(education: Education) {
    this.router.navigate(['/educationform/' + education.id]);
  }
  onAdd(){
    this.router.navigate(['/educationform']);
  }

  setActive(myEducation: Education){
    myEducation.active = true
    this.educationStore.dispatch(putEducation({education:myEducation, id: myEducation.id}));
  }

  setInActive(myEducation: Education){
    myEducation.active = false
    this.educationStore.dispatch(putEducation({education:myEducation, id: myEducation.id}));
  }
}
