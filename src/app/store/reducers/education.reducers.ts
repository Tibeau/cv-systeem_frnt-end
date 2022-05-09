import {Education} from "../../models/education/education";
import {createReducer, on} from "@ngrx/store";
import {
  loadEducations,
  loadEducationsFail,
  loadEducationsSuccess,
  changeEducation,
  changeEducationSuccess,
  changeEducationFail
} from '../actions/education.actions';
import {EducationPagination} from "../../models/education/education-pagination";

export const educationFeatureKey = "educations";

export const selectEducations = (state: State) => state.educations

export const selectEducation = (state: State) => state.educations


export interface State {
  educations: EducationPagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  educations: null,
  errorMessage: null,
};

export const educationReducer = createReducer(
  initialState,
  on(loadEducations, (state) => ({educations: null, errorMessage: "loading educations"})),
  on(loadEducationsSuccess, (state, props) => ({educations: props.educations, errorMessage: "loaded educations successfully"})),
  on(loadEducationsFail, (state) => ({educations: null, errorMessage: "failed to load educations"})),

  on(changeEducation, (state) => ({educations: null, errorMessage: "changing education"})),
  on(changeEducationSuccess, (state) => ({educations: null, errorMessage: "changed education successfully"})),
  on(changeEducationFail, (state) => ({educations: null, errorMessage: "failed to change education"})),
);


