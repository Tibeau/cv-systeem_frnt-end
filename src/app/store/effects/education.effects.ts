import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import {EducationService} from "../../services/education/education.service";
import * as educationActions from "../actions/education.actions"

@Injectable()
export class EducationEffects {

  constructor(
    private actions$: Actions,
    private educationService: EducationService
  ) {}


  getEducations$ = createEffect(() => this.actions$.pipe(
    tap(() => console.log("get effect")),
    ofType(educationActions.EducationActionTypes.GETEDUCATIONS),
    mergeMap(((response) => this.educationService.getEducationsByCandidateId("3")
      .pipe(
        tap(() => console.log("current educations are:" + response)),
        map(educations => ({type: educationActions.EducationActionTypes.GETEDUCATIONS_SUCCESS, payload: educations})),
        catchError(() => of({type: educationActions.EducationActionTypes.GETEDUCATIONS_FAIL}))
      )))
  ));
}
