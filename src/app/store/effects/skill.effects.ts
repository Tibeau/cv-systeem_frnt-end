import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {candidateId} from "../../education-feature/education.selector";
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
    switchMap((({page}) => this.skillService.getSkillsByCandidateId(candidateId, page)
      .pipe(
        map(skills => ( loadSkillsSuccess({skills}) )),
        catchError(() => of(loadSkillsFail))
      )))
  ));


  addSkill$ = createEffect(() => this.actions$.pipe(
    ofType(addSkill),
    switchMap(({skill}) => this.skillService.createSkill(skill)
      .pipe(
        map(skill => ( addSkillSuccess())),
        catchError(() => of(addSkillFail)),
        map(skill => (loadSkills({page: 0})))
      )))
  );


  changeSkill$ = createEffect(() => this.actions$.pipe(
    ofType(changeSkill),
    switchMap((({skill, id}) => this.skillService.putSkill(skill, id)
      .pipe(
        map(skill => ( changeSkillSuccess())),
        catchError(() => of(changeSkillFail)),
        map(skill => (loadSkills({page: 0})))
      )))
  ));

  removeSkill$ = createEffect(() => this.actions$.pipe(
    ofType(removeSkill),
    switchMap(({id}) => this.skillService.deleteSkill(id)
      .pipe(
        map(skill => ( removeSkillSuccess() )),
        catchError(() => of(removeSkillFail)),
        map(skill => (loadSkills({page: 0})))
      )))
  );
}
