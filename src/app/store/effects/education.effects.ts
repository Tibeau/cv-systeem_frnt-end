import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map, mergeMap, catchError, tap, switchMap} from 'rxjs/operators';
import {EducationService} from "../../services/education/education.service";
import * as educationActions from "../actions/education.actions"
import {
  addEducation,
  addEducationSuccess,
  loadEducationsSuccess, changeEducation,
  changeEducationSuccess, changeEducationFail, addEducationFail, loadEducationsFail, loadEducations
} from "../actions/education.actions";
import {candidateId} from "../../education-feature/education.selector";

@Injectable()
export class EducationEffects {

  constructor(
    private actions$: Actions,
    private educationService: EducationService,
  ) {}


  getEducations$ = createEffect(() => this.actions$.pipe(
    ofType(`[Education] loadEducations`),
    switchMap(((educations) => this.educationService.getEducationsByCandidateId(candidateId)
      .pipe(
        map(educations => ( loadEducationsSuccess({educations}) )),
        catchError(() => of(loadEducationsFail))
      )))
  ));


 addEducation$ = createEffect(() => this.actions$.pipe(
    ofType(`[Education] addEducations`),
    switchMap(({education}) => this.educationService.createEducation(education)
      .pipe(
        map(education => ( loadEducations() )),
        catchError(() => of(addEducationFail))
      )))
  );


  changeEducation$ = createEffect(() => this.actions$.pipe(
    ofType(changeEducation),
    switchMap((({education, id}) => this.educationService.putEducation(education, id)
      .pipe(
        map(education => ( loadEducations() )),
        catchError(() => of(changeEducationFail))
      )))
  ));

}
