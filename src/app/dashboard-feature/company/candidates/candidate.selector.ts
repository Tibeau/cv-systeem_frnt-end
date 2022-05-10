import {createFeatureSelector, createSelector} from "@ngrx/store";
import {candidateFeatureKey, selectCandidates, State} from "../../../store/reducers/candidate.reducers";


export const selectCandidateFeature = createFeatureSelector<State>(candidateFeatureKey);

export const selectMyCandidates = createSelector(selectCandidateFeature, selectCandidates);

