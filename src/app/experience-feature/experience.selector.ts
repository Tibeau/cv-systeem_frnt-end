import {createFeatureSelector, createSelector} from "@ngrx/store";
import {experienceFeatureKey, selectExperiences, State} from "../store/reducers/experience.reducers";

export const selectExperienceFeature = createFeatureSelector<State>(experienceFeatureKey);

export const selectMyExperiences = createSelector(selectExperienceFeature, selectExperiences);

export const candidateId = localStorage.getItem("CANDIDATE");
