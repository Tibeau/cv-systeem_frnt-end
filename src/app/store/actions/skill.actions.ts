import {createAction, props} from '@ngrx/store';
import {Skill} from "../../models/skill/skill";
import {SkillPagination} from "../../models/skill/skill-pagination";



let type = "[Skill]"


//CHANGE SKILL
export const changeSkill = createAction(
  `${type} changeSkill`,
  props<{skill: Skill, id: number}>(),
)

export const changeSkillSuccess = createAction(
  `${type} changeSkill SUCCESS`,
)

export const changeSkillFail = createAction(
  `${type} changeSkill FAIL`,
  props<{error: any}>()
)



//ADD SKILL
export const addSkill = createAction(
  `${type} addSkill`,
  props<{skill: Skill}>(),
)
export const addSkillSuccess = createAction(
  `${type} addSkill SUCCESS`,
)

export const addSkillFail = createAction(
  `${type} addSkill FAIL`,
  props<{error: any}>()
)


//LOAD SKILL
export const loadSkills = createAction(
  `${type} loadSkill`,
  props<{page: number, items: number}>(),
)
export const loadSkillsSuccess = createAction(
  `${type} loadSkills SUCCESS`,
  props<{skills: SkillPagination}>(),
)

export const loadSkillsFail = createAction(
  `${type} loadSkills FAIL`,
  props<{error: any}>()
)

//DELETE SKILL
export const removeSkill = createAction(
  `${type} removeSkill`,
  props<{id: number}>(),
)
export const removeSkillSuccess = createAction(
  `${type} removeSkill SUCCESS`,
)

export const removeSkillFail = createAction(
  `${type} removeSkill FAIL`,
  props<{error: any}>()
)
