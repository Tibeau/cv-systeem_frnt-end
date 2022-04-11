import {createAction, props} from '@ngrx/store';
import {Education} from "../../models/education";

let type = "[Education]"


//CHANGE EDUCATIONS
export const changeEducation = createAction(
  `${type} changeEducations`,
  props<{education: Education, id: number}>(),
)

export const changeEducationSuccess = createAction(
  `${type} changeEducations SUCCESS`,
)

export const changeEducationFail = createAction(
  `${type} changeEducations FAIL`,
  props<{error: any}>()
)



//ADD EDUCATIONS
export const addEducation = createAction(
  `${type} addEducations`,
  props<{education: Education}>(),
)
export const addEducationSuccess = createAction(
  `${type} addEducations SUCCESS`,
)

export const addEducationFail = createAction(
  `${type} addEducations FAIL`,
  props<{error: any}>()
)


//LOAD EDUCATIONS
export const loadEducations = createAction(
  `${type} loadEducations`,
)
export const loadEducationsSuccess = createAction(
  `${type} loadEducations SUCCESS`,
  props<{educations: Education[]}>(),
)

export const loadEducationsFail = createAction(
  `${type} loadEducations FAIL`,
  props<{error: any}>()
)
