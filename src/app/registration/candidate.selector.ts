import {createFeatureSelector, createSelector} from "@ngrx/store";
import {candidateFeatureKey, selectCandidate, State} from "../store/reducers/candidate.reducers";


export const selectCandidateFeature = createFeatureSelector<State>(candidateFeatureKey);

export const selectMyCandidate = createSelector(selectCandidateFeature, selectCandidate);

