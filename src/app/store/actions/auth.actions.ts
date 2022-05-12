import {createAction, props} from '@ngrx/store';
import {User} from "../../security/user";


let type = "[Auth]";


//CHANGE USER
export const changeUser = createAction(
  `${type} changeUser`,
  props<{user: User, id: number}>(),
)

export const changeUserSuccess = createAction(
  `${type} changeUser SUCCESS`,
)

export const changeUserFail = createAction(
  `${type} changeUser FAIL`,
  props<{error: any}>()
)



//LOGIN
export const logInSuccess = createAction(
  `${type} Login SUCCESS`,
  props<{user: User}>()
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


//GET USER
export const loadUser = createAction(
  `${type} get user`,
  props<{id: number}>()
)

export const loadUserSuccess = createAction(
  `${type} get user SUCCESS `,
  props<{user: User}>()
)

export const loadUserFailure = createAction(
  `${type} get user FAILURE`,
  props<{payload: any}>()
)


//ADD USER
export const addUser = createAction(
  `${type} add user`,
  props<{user: User}>()
)

export const addUserSuccess = createAction(
  `${type} add user SUCCESS `,
)

export const addUserFailure = createAction(
  `${type} add user FAILURE`,
)
