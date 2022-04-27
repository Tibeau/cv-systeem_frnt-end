import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectUser, State, userFeatureKey} from "../store/reducers/auth.reducers";

export const selectUserFeature = createFeatureSelector<State>(userFeatureKey);

export const selectMyUser = createSelector(selectUserFeature, selectUser);

export const candidateId = localStorage.getItem("id");
