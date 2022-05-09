import {createAction, props} from '@ngrx/store';
import {SkillItem} from "../../models/skillItem/skillItem";




let type = "[SkillItem]"


//CHANGE SKILLITEM
export const changeSkillItem = createAction(
  `${type} changeSkillItem`,
  props<{skillItem: SkillItem, id: number}>(),
)

export const changeSkillItemSuccess = createAction(
  `${type} changeSkillItem SUCCESS`,
)

export const changeSkillItemFail = createAction(
  `${type} changeSkillItem FAIL`,
  props<{error: any}>()
)



//ADD SKILLITEM
export const addSkillItem = createAction(
  `${type} addSkillItem`,
  props<{skillItem: SkillItem}>(),
)
export const addSkillItemSuccess = createAction(
  `${type} addSkillItem SUCCESS`,
)

export const addSkillItemFail = createAction(
  `${type} addSkillItem FAIL`,
  props<{error: any}>()
)


//LOAD SKILLITEM
export const loadSkillItems = createAction(
  `${type} loadSkillItem`,
)
export const loadSkillItemsSuccess = createAction(
  `${type} loadSkillItems SUCCESS`,
  props<{skillItems: SkillItem[]}>(),
)

export const loadSkillItemsFail = createAction(
  `${type} loadSkillItems FAIL`,
  props<{error: any}>()
)

//DELETE SKILLITEM
export const removeSkillItem = createAction(
  `${type} removeSkillItem`,
  props<{id: number}>(),
)
export const removeSkillItemSuccess = createAction(
  `${type} removeSkillItem SUCCESS`,
)

export const removeSkillItemFail = createAction(
  `${type} removeSkillItem FAIL`,
  props<{error: any}>()
)
