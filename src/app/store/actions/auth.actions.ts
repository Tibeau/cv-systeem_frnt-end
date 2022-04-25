import {createAction, props} from '@ngrx/store';


let type = "[Auth]";

//LOGIN
export const logInSuccess = createAction(
  `${type} Login SUCCESS`,
  props<{token: any, email: any, id: any}>()
)

export const login = createAction(
  `${type} Login`,
  props<{payload: any}>()
)

export const logInFailure = createAction(
  `${type} Login FAILURE`,
  props<{payload: any}>()
)

export const logout = createAction(
  `${type} Logout`,
)

