import {createFeatureSelector, createSelector} from "@ngrx/store";
import {
  educationFeatureKey,
  selectEducations,
  State
} from "../store/reducers/education.reducers";

export const selectEducationFeature = createFeatureSelector<State>(educationFeatureKey);

export const selectMyEducations = createSelector(selectEducationFeature, selectEducations);

export const candidateId = localStorage.getItem("CANDIDATE");
