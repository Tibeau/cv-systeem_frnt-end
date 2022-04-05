import { Component, OnInit } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {Education} from "../../models/education";
import {select, Store} from '@ngrx/store';
import * as educationActions from "../../store/actions/education.actions"

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations$: Observable<Education[]> = this.store.select(state => state.educations)
  educations: Education[] = []
  faPencil = faPencil

  constructor(private store: Store<{ educations: Education[] }>) {
  }

  ngOnInit(): void {
    console.log("start store dispatch")
    this.store.dispatch({type: educationActions.EducationActionTypes.GET_EDUCATIONS, candidateId: "3"});
    this.educations$ = this.store.pipe(select('educations')),
    // this.educations$.subscribe( (educations: Education[]) => {
    //   console.log(educations)
    // })
    console.log(this.educations$)
  }

}
