import {createReducer, on} from "@ngrx/store";
import {ExperiencePagination} from "../../models/experience/experience-pagination";
import {
  changeExperience,
  changeExperienceFail,
  changeExperienceSuccess,
  loadExperiences, loadExperiencesFail, loadExperiencesSuccess
} from "../actions/experience.actions";

export const experienceFeatureKey = "experiences";

export const selectExperiences = (state: State) => state.experiences

export const selectEExperience = (state: State) => state.experiences


export interface State {
  experiences: ExperiencePagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  experiences: null,
  errorMessage: null,
};

export const experienceReducer = createReducer(
  initialState,
  on(loadExperiences, (state) => ({experiences: null, errorMessage: "loading experiences"})),
  on(loadExperiencesSuccess, (state, props) => ({experiences: props.experiences, errorMessage: "loaded experiences successfully"})),
  on(loadExperiencesFail, (state) => ({experiences: null, errorMessage: "failed to load experiences"})),

  on(changeExperience, (state) => ({experiences: null, errorMessage: "changing experiences"})),
  on(changeExperienceSuccess, (state) => ({experiences: null, errorMessage: "changed experiences successfully"})),
  on(changeExperienceFail, (state) => ({experiences: null, errorMessage: "failed to change experiences"})),

);


