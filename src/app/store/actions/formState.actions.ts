import {Action, createAction, props} from '@ngrx/store';

export enum EducationActionTypes{
  SET_ADD_FORMSTATE= "[Formstate] setFormstate ADD",
  SET_EDIT_FORMSTATE= "[Formstate] setFormstate EDIT",
  RESET_FORMSTATE = "[Formstate] setFormstate RESET"

}

export const setAddFormState = createAction(
  EducationActionTypes.SET_ADD_FORMSTATE,
)

export const setEditFormState = createAction(
  EducationActionTypes.SET_EDIT_FORMSTATE,
  props<{id: number}>(),
)

export const resetFormState = createAction(
  EducationActionTypes.RESET_FORMSTATE,
)
