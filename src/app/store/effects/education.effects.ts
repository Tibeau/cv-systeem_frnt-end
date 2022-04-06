import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {map, mergeMap, catchError, tap} from 'rxjs/operators';
import {EducationService} from "../../services/education/education.service";
import * as educationActions from "../actions/education.actions"
import {loadEducationsSuccess, loadEducationSuccess} from "../actions/education.actions";
import {candidateId} from "../../education-feature/education.selector";

@Injectable()
export class EducationEffects {

  constructor(
    private actions$: Actions,
    private educationService: EducationService
  ) {}


  getEducations$ = createEffect(() => this.actions$.pipe(
    tap(() => console.log("get eduactions by candidateid")),
    ofType(educationActions.EducationActionTypes.GET_EDUCATIONS),
    mergeMap(((educations) => this.educationService.getEducationsByCandidateId(candidateId)
      .pipe(
        tap(() => console.log(educations)),
        map(educations => ( loadEducationsSuccess({educations}) )),
        catchError(() => of({type: educationActions.EducationActionTypes.GET_EDUCATIONS_FAIL}))
      )))
  ));

  getEducation$ = createEffect(() => this.actions$.pipe(
    tap(() => console.log("get education")),
    ofType(educationActions.EducationActionTypes.GET_EDUCATION),
    mergeMap(((education) => this.educationService.getEducation("3")
      .pipe(
        tap(() => console.log(education)),
        map(education => ( loadEducationSuccess({education}) )),
        catchError(() => of({type: educationActions.EducationActionTypes.GET_EDUCATION_FAIL}))
      )))
  ));


}
