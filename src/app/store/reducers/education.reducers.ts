import {Education} from "../../models/education";
import {createReducer, on} from "@ngrx/store";
import {
  loadEducation, loadEducationFail,
  loadEducations,
  loadEducationsFail,
  loadEducationsSuccess,
  loadEducationSuccess
} from '../actions/education.actions';
import {AppState} from "../app.states";

export const educationFeatureKey = "educations";

export const selectEducations = (state: State) => state.educations

export const selectEducation = (state: State) => state.education


export interface State {
  educations: Education[] | null;
  errorMessage: string | null;
  education: Education | null;
}

export const initialState: State = {
  educations: null,
  errorMessage: null,
  education: null,
};

export const educationReducer = createReducer(
  initialState,
  on(loadEducations, (state) => ({educations: null, errorMessage: "still loading educations", education: null})),
  on(loadEducationsSuccess, (state, props) => ({educations: props.educations, errorMessage: "loaded educations", education: null})),
  on(loadEducationsFail, (state) => ({educations: null, errorMessage: "failed to load educations", education: null})),
  on(loadEducation, (state) => ({educations: null, errorMessage: "still loading education", education: null})),
  on(loadEducationSuccess, (state, props) => ({educations: null, errorMessage: "loaded education", education: props.education})),
  on(loadEducationFail, (state) => ({educations: null, errorMessage: "failed to load education", education: null})),

);


