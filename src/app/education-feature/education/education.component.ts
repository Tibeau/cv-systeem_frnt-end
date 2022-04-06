import { Component, OnInit } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {Education} from "../../models/education";
import {select, Store} from '@ngrx/store';
import * as educationActions from "../../store/actions/education.actions"
import {selectMyEducations} from "../education.selector";
import {Router} from "@angular/router";
import {FormState} from "../../models/formState";
import {
  setEditFormState
} from '../../store/actions/formState.actions';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations$: Observable<Education[] | null> = this.educationStore.select(selectMyEducations)
  faPencil = faPencil

  constructor(private router: Router, private educationStore: Store<{ educations: Education[] }>, private formStore: Store<{formState: FormState}>) {
  }

  ngOnInit(): void {
    console.log("start store dispatch")
    this.educationStore.dispatch({type: educationActions.EducationActionTypes.GET_EDUCATIONS});
    this.educations$.subscribe()
  }

  onClick(educationId: number) {
    // this.formStore.dispatch(setEditFormState({educationId}))
    this.router.navigate(['/educationform']);
  }
}
