import {createReducer, on} from "@ngrx/store";
import {User} from "../../security/user";
import {addUser, addUserFailure, addUserSuccess} from "../actions/auth.actions";

export const newUserFeatureKey = "newUser";

export const selectNewUser = (state: State) => state.user

export interface State {
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  user: null,
  errorMessage: null,
};

export const newUserReducer = createReducer(
  initialState,
  on(addUser, (state) => ({user: null, errorMessage: "adding user"})),
  on(addUserSuccess, (state, props) => ({user: props.user, errorMessage: "added user successfully"})),
  on(addUserFailure, (state) => ({user: null, errorMessage: "failed to add users"})),
);


