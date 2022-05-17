import {User} from "../../security/user";
import {createReducer, on} from "@ngrx/store";
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  login,
  logInFailure,
  logInSuccess,
  logout
} from "../actions/auth.actions";


export const userFeatureKey = "user";

export const selectUser = (state: State) => state.user



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
  on(logInFailure, (state) => ({
    isAuthenticated: false,
    user: null,
    errorMessage: 'Incorrect email and/or password.'})),
  on(logout, (state) => ({
    isAuthenticated: false,
    user: null,
    errorMessage: null})),
  on(loadUserSuccess, (state, props) => ({
    isAuthenticated: true,
    user: props.user,
    errorMessage: null})),
);



