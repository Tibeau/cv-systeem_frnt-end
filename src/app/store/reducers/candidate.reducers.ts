import {createReducer, on} from "@ngrx/store";
import {UserPagination} from "../../models/candidate/candidate-pagination";
import {loadCandidates, loadCandidatesFail, loadCandidatesSuccess} from "../actions/candidate.actions";
export const candidateFeatureKey = "candidates";

export const selectCandidates = (state: State) => state.candidates

export interface State {
  candidates: UserPagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  candidates: null,
  errorMessage: null,
};

export const candidateReducer = createReducer(
  initialState,
  on(loadCandidates, (state) => ({candidates: null, errorMessage: "loading candidates"})),
  on(loadCandidatesSuccess, (state, props) => ({candidates: props.candidates, errorMessage: "loaded candidates successfully"})),
  on(loadCandidatesFail, (state) => ({candidates: null, errorMessage: "failed to load candidates"})),
);


