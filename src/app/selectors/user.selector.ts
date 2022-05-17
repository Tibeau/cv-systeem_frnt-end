import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectCandidates, State, userFeatureKey} from "../store/reducers/user.reducers";


export const selectCandidateFeature = createFeatureSelector<State>(userFeatureKey);

export const selectMyCandidates = createSelector(selectCandidateFeature, selectCandidates);

