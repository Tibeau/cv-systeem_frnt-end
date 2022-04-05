import {Education} from "../../models/education";
import {createReducer, on} from "@ngrx/store";
import {loadEducations, loadEducationsFail, loadEducationsSuccess} from '../actions/education.actions';

export interface State {
  // if authenticated, there should be a user object
  educations: Education[] | null;
  // error message
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


