import {Action, createAction, props} from '@ngrx/store';
import {Education} from "../../models/education";

export enum EducationActionTypes{
  GET_EDUCATIONS = "[Education] getEducations",
  GET_EDUCATIONS_SUCCESS = "[Education] getEducations SUCCESS",
  GET_EDUCATIONS_FAIL = "[Education] getEducations FAIL",
  GET_EDUCATION = "[Education] getEducation",
  GET_EDUCATION_SUCCESS ="[Education] getEducation SUCCESS",
  GET_EDUCATION_FAIL = "[Education] getEducations FAIL",

}

export const loadEducations = createAction(
  EducationActionTypes.GET_EDUCATIONS,
)
export const loadEducationsSuccess = createAction(
  EducationActionTypes.GET_EDUCATIONS_SUCCESS,
  props<{educations: Education[]}>(),
)

export const loadEducationsFail = createAction(
  EducationActionTypes.GET_EDUCATIONS_FAIL,
  props<{error: any}>()
)

export const loadEducation = createAction(
  EducationActionTypes.GET_EDUCATIONS,
  props<{id: string}>(),

)
export const loadEducationSuccess = createAction(
  EducationActionTypes.GET_EDUCATION_SUCCESS,
  props<{education: Education}>(),
)

export const loadEducationFail = createAction(
  EducationActionTypes.GET_EDUCATIONS_FAIL,
  props<{error: any}>()
)
