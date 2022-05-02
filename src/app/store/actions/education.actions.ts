import {createAction, props} from '@ngrx/store';
import {Education} from "../../models/education/education";
import {EducationPagination} from "../../models/education/education-pagination";

let type = "[Education]"


//CHANGE EDUCATIONS
export const changeEducation = createAction(
  `${type} changeEducation`,
  props<{education: Education, id: number}>(),
)

export const changeEducationSuccess = createAction(
  `${type} changeEducation SUCCESS`,
)

export const changeEducationFail = createAction(
  `${type} changeEducation FAIL`,
  props<{error: any}>()
)



//ADD EDUCATIONS
export const addEducation = createAction(
  `${type} addEducation`,
  props<{education: Education}>(),
)
export const addEducationSuccess = createAction(
  `${type} addEducation SUCCESS`,
)

export const addEducationFail = createAction(
  `${type} addEducation FAIL`,
  props<{error: any}>()
)


//LOAD EDUCATIONS
export const loadEducations = createAction(
  `${type} loadEducations`,
  props<{page: number}>(),
)
export const loadEducationsSuccess = createAction(
  `${type} loadEducations SUCCESS`,
  props<{educations: EducationPagination}>(),
)

export const loadEducationsFail = createAction(
  `${type} loadEducations FAIL`,
  props<{error: any}>()
)

//DELETE EDUCATION
export const removeEducation = createAction(
  `${type} removeEducation`,
  props<{id: number}>(),
)
export const removeEducationSuccess = createAction(
  `${type} removeEducation SUCCESS`,
)

export const removeEducationFail = createAction(
  `${type} removeEducation FAIL`,
  props<{error: any}>()
)
