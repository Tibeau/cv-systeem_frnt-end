import {Action, createAction, props} from '@ngrx/store';
import {Education} from "../../models/education";

export enum EducationActionTypes{
  GETEDUCATIONS = "[Education] getEducations",
  GETEDUCATIONS_SUCCESS = "[Education] getEducations SUCCESS",
  GETEDUCATIONS_FAIL = "[Education] getEducations FAIL",

}


export class getEducationsByCandidate implements Action {
  readonly type = EducationActionTypes.GETEDUCATIONS;
  constructor(public payload: any) {}
}

export const loadEducations = createAction(
  EducationActionTypes.GETEDUCATIONS
)

export const loadEducationsSuccess = createAction(
  EducationActionTypes.GETEDUCATIONS_SUCCESS,
  props<{educations: Education[]}>(),
)

export const loadEducationsFail = createAction(
  EducationActionTypes.GETEDUCATIONS_FAIL,
  props<{error: any}>()
)


export type All = | getEducationsByCandidate;
