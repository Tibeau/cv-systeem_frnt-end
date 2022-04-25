import {User} from "../../security/user";
import {createReducer, on} from "@ngrx/store";
import {
  changeEducation, changeEducationFail,
  changeEducationSuccess,
  loadEducations,
  loadEducationsFail,
  loadEducationsSuccess
} from "../actions/education.actions";
import {login, logInFailure, logInSuccess, logout} from "../actions/auth.actions";



export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export const authReducer = createReducer(
  initialState,
  on(logInSuccess, (state, props) => ({
    isAuthenticated: true,
    user: {
      token: props.token,
      email: props.email
    },
    errorMessage: null})),
  on(logInFailure, (state) => ({
    isAuthenticated: false,
    user: null,
    errorMessage: 'Incorrect email and/or password.'})),
  on(logout, (state) => ({
    isAuthenticated: false,
    user: null,
    errorMessage: null})),

);



