import {User} from "../../security/user";
import {createReducer, on} from "@ngrx/store";
import {loadUserSuccess, login, logInFailure, logInSuccess, logout} from "../actions/auth.actions";



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

export const userFeatureKey = "user";

export const selectUser = (state: State) => state.user


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
    user: {
      id: props.user.id,
      password: props.user.password,
      email: props.user.email,
      token: props.user.token,
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      street: props.user.street,
      country: props.user.country,
      active: props.user.active,
      role: props.user.role,
      description: props.user.description,
      city: props.user.city,
      number: props.user.number,
      postalcode: props.user.postalcode,
      phone: props.user.phone,
      linkedIn: props.user.linkedIn,
      imgUrl: props.user.imgUrl,
      driversLicence: props.user.driversLicence,
      candidateId: props.user.candidateId,
      companyId: props.user.companyId,
      username: props.user.username,
      authorities: props.user.authorities,
    },
    errorMessage: null})),

);



