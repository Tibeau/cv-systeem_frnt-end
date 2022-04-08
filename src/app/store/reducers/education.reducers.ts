import {Education} from "../../models/education";
import {createReducer, on} from "@ngrx/store";
import {
  createEducation, createEducationFail, createEducationSuccess,
  loadEducations,
  loadEducationsFail,
  loadEducationsSuccess,
} from '../actions/education.actions';
import {AppState} from "../app.states";

export const educationFeatureKey = "educations";

export const selectEducations = (state: State) => state.educations

export const selectEducation = (state: State) => state.educations


export interface State {
  educations: Education[] | null;
  errorMessage: string | null;
}

export const initialState: State = {
  educations: null,
  errorMessage: null,
};

export const educationReducer = createReducer(
  initialState,
  on(loadEducations, (state) => ({educations: null, errorMessage: "still loading educations"})),
  on(loadEducationsSuccess, (state, props) => ({educations: props.educations, errorMessage: "loaded educations"})),
  on(loadEducationsFail, (state) => ({educations: null, errorMessage: "failed to load educations"})),
);


