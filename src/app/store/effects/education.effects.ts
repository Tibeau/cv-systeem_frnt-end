import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map, mergeMap, catchError, tap, switchMap} from 'rxjs/operators';
import {EducationService} from "../../services/education/education.service";
import * as educationActions from "../actions/education.actions"
import {
  createEducation,
  createEducationSuccess,
  loadEducationsSuccess, putEducation,
  putEducationSuccess
} from "../actions/education.actions";
import {candidateId} from "../../education-feature/education.selector";

@Injectable()
export class EducationEffects {

  constructor(
    private actions$: Actions,
    private educationService: EducationService,
  ) {}


  getEducations$ = createEffect(() => this.actions$.pipe(
    ofType(educationActions.EducationActionTypes.GET_EDUCATIONS),
    switchMap(((educations) => this.educationService.getEducationsByCandidateId(candidateId)
      .pipe(
        map(educations => ( loadEducationsSuccess({educations}) )),
        catchError(() => of({type: educationActions.EducationActionTypes.GET_EDUCATIONS_FAIL})),
      )))
  ));


  createEducation$ = createEffect(() => this.actions$.pipe(
    ofType(createEducation),
    switchMap(({education}) => this.educationService.createEducation(education)
      .pipe(
        map(education => ( createEducationSuccess() )),
        catchError(() => of({type: educationActions.EducationActionTypes.CREATE_EDUCATION_FAIL}))
      )))
  );


  putEducation$ = createEffect(() => this.actions$.pipe(
    ofType(putEducation),
    switchMap((({education, id}) => this.educationService.putEducation(education, id)
      .pipe(
        map(education => ( putEducationSuccess() )),
        catchError(() => of({type: educationActions.EducationActionTypes.PUT_EDUCATION_FAIL}))
      )))
  ));

}
