import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {candidateId} from "../../education-feature/education.selector";
import {ExperienceService} from "../../services/experience/experience.service";
import {
  addExperience,
  addExperienceFail,
  addExperienceSuccess,
  changeExperience,
  changeExperienceFail,
  changeExperienceSuccess,
  loadExperiences,
  loadExperiencesFail,
  loadExperiencesSuccess, removeExperience, removeExperienceFail, removeExperienceSuccess
} from "../actions/experience.actions";

@Injectable()
export class ExperienceEffects{

  constructor(
    private actions$: Actions,
    private experienceService: ExperienceService,
  ) {}


  getExperiences$ = createEffect(() => this.actions$.pipe(
    ofType(loadExperiences),
    switchMap((({page}) => this.experienceService.getExperiencesByCandidateId(candidateId, page)
      .pipe(
        map(experiences => ( loadExperiencesSuccess({experiences}) )),
        catchError(() => of(loadExperiencesFail))
      )))
  ));


  addExperience$ = createEffect(() => this.actions$.pipe(
    ofType(addExperience),
    switchMap(({experience}) => this.experienceService.createExperience(experience)
      .pipe(
        map(experience => ( addExperienceSuccess())),
        catchError(() => of(addExperienceFail)),
        map(experience => (loadExperiences({page: 0})))
      )))
  );


  changeExperience$ = createEffect(() => this.actions$.pipe(
    ofType(changeExperience),
    switchMap((({experience, id}) => this.experienceService.putExperience(experience, id)
      .pipe(
        map(experience => ( changeExperienceSuccess())),
        catchError(() => of(changeExperienceFail)),
        map(experience => (loadExperiences({page: 0})))
      )))
  ));

  removeExperience$ = createEffect(() => this.actions$.pipe(
    ofType(removeExperience),
    switchMap(({id}) => this.experienceService.deleteExperience(id)
      .pipe(
        map(experience => ( removeExperienceSuccess() )),
        catchError(() => of(removeExperienceFail)),
        map(experience => (loadExperiences({page: 0})))
      )))
  );
}
