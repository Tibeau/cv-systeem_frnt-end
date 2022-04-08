import {Action, createAction, props} from '@ngrx/store';
import {Education} from "../../models/education";
import {AuthActionTypes} from "./auth.actions";

export enum EducationActionTypes{
  GET_EDUCATIONS = "[Education] getEducations",
  GET_EDUCATIONS_SUCCESS = "[Education] getEducations SUCCESS",
  GET_EDUCATIONS_FAIL = "[Education] getEducations FAIL",
  CREATE_EDUCATION = "[Education] createEducation",
  CREATE_EUCATION_SUCCESS = "[Education] createEducation SUCCESS",
  CREATE_EDUCATION_FAIL = "[Education] createEducation FAIL",
  PUT_EDUCATION = "[Education] putEducation",
  PUT_EDUCATION_SUCCESS = "[Education] putEducation SUCCESS",
  PUT_EDUCATION_FAIL = "[Education] putEducation FAIL",

}


export const putEducation = createAction(
  EducationActionTypes.PUT_EDUCATION,
  props<{education: Education, id: number}>(),
)

export const putEducationSuccess = createAction(
  EducationActionTypes.PUT_EDUCATION_SUCCESS,
)

export const putEducationFail = createAction(
  EducationActionTypes.PUT_EDUCATION_FAIL,
  props<{error: any}>()
)


export const createEducation = createAction(
  EducationActionTypes.CREATE_EDUCATION,
  props<{education: Education}>(),
)
export const createEducationSuccess = createAction(
  EducationActionTypes.CREATE_EUCATION_SUCCESS,
)

export const createEducationFail = createAction(
  EducationActionTypes.CREATE_EDUCATION_FAIL,
  props<{error: any}>()
)


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
