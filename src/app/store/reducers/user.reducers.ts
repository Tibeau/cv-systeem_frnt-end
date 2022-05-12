import {createReducer, on} from "@ngrx/store";
import {UserPagination} from "../../models/user/user-pagination";
import {loadCandidates, loadCandidatesFail, loadCandidatesSuccess} from "../actions/user.actions";
export const candidateFeatureKey = "users";

export const selectCandidates = (state: State) => state.users

export interface State {
  users: UserPagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  users: null,
  errorMessage: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadCandidates, (state) => ({users: null, errorMessage: "loading users"})),
  on(loadCandidatesSuccess, (state, props) => ({users: props.users, errorMessage: "loaded users successfully"})),
  on(loadCandidatesFail, (state) => ({users: null, errorMessage: "failed to load users"})),
);


