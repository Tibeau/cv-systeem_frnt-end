import {Candidate} from "../../models/candidate/candidate";
import {createReducer, on} from "@ngrx/store";
import {
  addCandidate, addCandidateFail, addCandidateSuccess,
} from "../actions/candidate.actions";

export const candidateFeatureKey = "candidate";

export const selectCandidate = (state: State) => state.candidate


export interface State {
  candidate: Candidate | null;
  errorMessage: string | null;
}

export const initialState: State = {
  candidate: null,
  errorMessage: null,
};

export const candidateReducer = createReducer(
  initialState,
  on(addCandidate, (state) => ({candidate: null, errorMessage: "adding candidate"})),
  on(addCandidateSuccess, (state, props) => ({candidate: props.candidate, errorMessage: "adding candidate successfully"})),
  on(addCandidateFail, (state) => ({candidate: null, errorMessage: "failed to add candidate"})),

);


