import {createAction, props} from '@ngrx/store';
import {Experience} from "../../models/experience/experience";
import {ExperiencePagination} from "../../models/experience/experience-pagination";



let type = "[Experience]"


//CHANGE EXPERIENCE
export const changeExperience = createAction(
  `${type} changeExperience`,
  props<{experience: Experience, id: number}>(),
)

export const changeExperienceSuccess = createAction(
  `${type} changeExperience SUCCESS`,
)

export const changeExperienceFail = createAction(
  `${type} changeExperience FAIL`,
  props<{error: any}>()
)



//ADD EXPERIENCE
export const addExperience = createAction(
  `${type} addExperience`,
  props<{experience: Experience}>(),
)
export const addExperienceSuccess = createAction(
  `${type} addExperience SUCCESS`,
)

export const addExperienceFail = createAction(
  `${type} addExperience FAIL`,
  props<{error: any}>()
)


//LOAD EXPERIENCE
export const loadExperiences = createAction(
  `${type} loadExperience`,
  props<{page: number, items: number}>(),
)
export const loadExperiencesSuccess = createAction(
  `${type} loadExperiences SUCCESS`,
  props<{experiences: ExperiencePagination}>(),
)

export const loadExperiencesFail = createAction(
  `${type} loadExperiences FAIL`,
  props<{error: any}>()
)

//DELETE EXPERIENCE
export const removeExperience = createAction(
  `${type} removeExperience`,
  props<{id: number}>(),
)
export const removeExperienceSuccess = createAction(
  `${type} removeExperience SUCCESS`,
)

export const removeExperienceFail = createAction(
  `${type} removeExperience FAIL`,
  props<{error: any}>()
)
