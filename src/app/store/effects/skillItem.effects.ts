import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {SkillItemService} from "../../services/skillItem/skill-item.service";
import {
  addSkillItem,
  addSkillItemFail,
  addSkillItemSuccess,
  changeSkillItem,
  changeSkillItemFail,
  changeSkillItemSuccess,
  loadSkillItems,
  loadSkillItemsFail,
  loadSkillItemsSuccess,
  removeSkillItem,
  removeSkillItemFail,
  removeSkillItemSuccess
} from "../actions/skillItem.actions";
import {candidateId} from "../../selectors/auth.selector";

@Injectable()
export class SkillItemEffects {

  getSkillItems$ = createEffect(() => this.actions$.pipe(
    ofType(loadSkillItems),
    switchMap((() => this.skillItemService.getSkillsByCandidateId(candidateId)
      .pipe(
        map(skillItems => (loadSkillItemsSuccess({skillItems}))),
        catchError(() => of(loadSkillItemsFail))
      )))
  ));
  addSkillItem$ = createEffect(() => this.actions$.pipe(
    ofType(addSkillItem),
    switchMap(({skillItem}) => this.skillItemService.createSkillItem(skillItem)
      .pipe(
        //map(skillItem => (addSkillItemSuccess({skillItem: skillItem}))),
        catchError(() => of(addSkillItemFail)),
        map(skillItem => (loadSkillItems()))
      )))
  );
  changeSkillItem$ = createEffect(() => this.actions$.pipe(
    ofType(changeSkillItem),
    switchMap((({skillItem, id}) => this.skillItemService.putSkillItem(skillItem, id)
      .pipe(
        //map(skillItem => (changeSkillItemSuccess())),
        catchError(() => of(changeSkillItemFail)),
        map(skillItem => (loadSkillItems()))
      )))
  ));
  removeSkillItem$ = createEffect(() => this.actions$.pipe(
    ofType(removeSkillItem),
    switchMap(({id}) => this.skillItemService.deleteSkillItem(id)
      .pipe(
        map(skillItem => (removeSkillItemSuccess())),
        catchError(() => of(removeSkillItemFail)),
        map(skillItem => (loadSkillItems()))
      )))
  );

  constructor(
    private actions$: Actions,
    private skillItemService: SkillItemService,
  ) {
  }
}
