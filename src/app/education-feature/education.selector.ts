import {createFeatureSelector, createSelector} from "@ngrx/store";
import {educationFeatureKey, selectEducation, selectEducations, State} from "../store/reducers/education.reducers";

export const selectEducationFeature = createFeatureSelector<State>(educationFeatureKey);

export const selectMyEducations = createSelector(selectEducationFeature, selectEducations);

export const candidateId = localStorage.getItem("id");

export const selectMyEducation = createSelector(selectEducationFeature, selectEducation)
