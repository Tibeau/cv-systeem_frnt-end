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
  removeEducation
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
    switchMap(((educations) => this.educationService.getEducationsByCandidateId(candidateId)
      .pipe(
        map(educations => ( loadEducationsSuccess({educations}) )),
        catchError(() => of(loadEducationsFail))
      )))
  ));


 addEducation$ = createEffect(() => this.actions$.pipe(
    ofType(addEducation),
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

  removeEducation$ = createEffect(() => this.actions$.pipe(
    ofType(removeEducation),
    switchMap(({id}) => this.educationService.deleteEducation(id)
      .pipe(
        map(education => ( loadEducations() )),
        catchError(() => of(removeEducationFail))
      )))
  );
}
