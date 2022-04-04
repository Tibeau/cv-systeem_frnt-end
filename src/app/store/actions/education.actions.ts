import {Action, createAction, props} from '@ngrx/store';
import {Education} from "../../models/education";

export enum EducationActionTypes{
  GET_EDUCATIONS = "[Education] getEducations",
  GET_EDUCATIONS_SUCCESS = "[Education] getEducations SUCCESS",
  GET_EDUCATIONS_FAIL = "[Education] getEducations FAIL",

}


// export class loadEducations implements Action{
//   readonly type = EducationActionTypes.GETEDUCATIONS;
// }

export const loadEducations = createAction(
  EducationActionTypes.GET_EDUCATIONS
)

export const loadEducationsSuccess = createAction(
  EducationActionTypes.GET_EDUCATIONS_SUCCESS,
  props<{educations: Education[]}>(),
)

export const loadEducationsFail = createAction(
  EducationActionTypes.GET_EDUCATIONS_FAIL,
  props<{error: any}>()
)
