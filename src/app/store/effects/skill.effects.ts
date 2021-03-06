import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of, pipe} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {candidateId} from "../../selectors/auth.selector";
import {SkillService} from "../../services/skill/skill.service";
import {
  addSkillSuccess,
  addSkill,
  addSkillFail,
  changeSkill,
  loadSkills,
  loadSkillsFail,
  loadSkillsSuccess,
  changeSkillSuccess,
  removeSkillFail,
  removeSkillSuccess,
  removeSkill,
  changeSkillFail
} from "../actions/skill.actions";

@Injectable()
export class SkillEffects{

  constructor(
    private actions$: Actions,
    private skillService: SkillService,
  ) {}


  getSkills$ = createEffect(() => this.actions$.pipe(
    ofType(loadSkills),
    switchMap((({page, items}) => this.skillService.getSkillsByCandidateId(candidateId, page, items)
      .pipe(
        map(skills => ( loadSkillsSuccess({skills}) )),
        catchError(() => of(loadSkillsFail))
      )))
  ));


  addSkill$ = createEffect(() => this.actions$.pipe(
    ofType(addSkill),
    switchMap(({skill}) => this.skillService.createSkill(skill)
      .pipe(
        map(newSkill => ( addSkillSuccess({skill: newSkill}))),
        catchError(() => of(addSkillFail)),
      )))
  );

  addSkillSuccess = createEffect(() => this.actions$.pipe(
    ofType(addSkillSuccess),
    pipe(
      catchError(() => of(addSkillFail)),
      map(skill => (loadSkills({page: 0, items: 3})))
    )))


  changeSkill$ = createEffect(() => this.actions$.pipe(
    ofType(changeSkill),
    switchMap((({skill, id}) => this.skillService.putSkill(skill, id)
      .pipe(
        map(skill => ( changeSkillSuccess({skill: skill}))),
        catchError(() => of(changeSkillFail)),
      )))
  ));

  changeSkillSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(changeSkillSuccess),
      pipe(
        catchError(() => of(changeSkillFail)),
        map(skill => (loadSkills({page: 0, items: 3})))
      )))


  removeSkill$ = createEffect(() => this.actions$.pipe(
    ofType(removeSkill),
    switchMap(({id}) => this.skillService.deleteSkill(id)
      .pipe(
        map(skill => ( removeSkillSuccess() )),
        catchError(() => of(removeSkillFail)),
        map(skill => (loadSkills({page: 0, items: 3})))
      )))
  );
}
