import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {EducationService} from "../../services/education/education.service";
import {
  addEducation,
  addEducationSuccess,
  loadEducationsSuccess,
  changeEducation,
  changeEducationSuccess,
  changeEducationFail,
  addEducationFail,
  loadEducationsFail,
  loadEducations,
  removeEducationFail,
  removeEducation, removeEducationSuccess
} from "../actions/education.actions";
import {candidateId} from "../../education-feature/education.selector";

@Injectable()
export class EducationEffects {

  constructor(
    private actions$: Actions,
    private educationService: EducationService,
  ) {}


  getEducations$ = createEffect(() => this.actions$.pipe(
    ofType(loadEducations),
    switchMap((({page, items}) => this.educationService.getEducationsByCandidateId(candidateId, page, items)
      .pipe(
        map(educations => ( loadEducationsSuccess({educations}) )),
        catchError(() => of(loadEducationsFail))
      )))
  ));


  addEducation$ = createEffect(() => this.actions$.pipe(
    ofType(addEducation),
    switchMap(({education}) => this.educationService.createEducation(education)
      .pipe(
        map(education => ( addEducationSuccess())),
        catchError(() => of(addEducationFail)),
        map(education => (loadEducations({page: 0, items: 3})))
      )))
  );


  changeEducation$ = createEffect(() => this.actions$.pipe(
    ofType(changeEducation),
    switchMap((({education, id}) => this.educationService.putEducation(education, id)
      .pipe(
        map(education => ( changeEducationSuccess())),
        catchError(() => of(changeEducationFail)),
        map(education => (loadEducations({page: 0, items: 3})))
      )))
  ));

  removeEducation$ = createEffect(() => this.actions$.pipe(
    ofType(removeEducation),
    switchMap(({id}) => this.educationService.deleteEducation(id)
      .pipe(
        map(education => ( removeEducationSuccess() )),
        catchError(() => of(removeEducationFail)),
        map(education => (loadEducations({page: 0, items: 3})))
      )))
  );
}
