import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import {EducationService} from "../../services/education/education.service";
import * as educationActions from "../actions/education.actions"
import {loadEducationsSuccess} from "../actions/education.actions";

@Injectable()
export class EducationEffects {

  constructor(
    private actions$: Actions,
    private educationService: EducationService
  ) {}


  getEducations$ = createEffect(() => this.actions$.pipe(
    tap(() => console.log("get effect")),
    ofType(educationActions.EducationActionTypes.GET_EDUCATIONS),
    tap( (candidateId) => localStorage.getItem("id")),
    mergeMap(((educations) => this.educationService.getEducationsByCandidateId("3")
      .pipe(
        tap(() => console.log(educations)),
        map(educations => ( loadEducationsSuccess({educations}) )),
        catchError(() => of({type: educationActions.EducationActionTypes.GET_EDUCATIONS_FAIL}))
      )))
  ));


}
