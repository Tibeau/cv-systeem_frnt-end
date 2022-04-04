import {Education} from "../../models/education";
import {createReducer, Action, on} from "@ngrx/store";
import * as EducationActions from '../actions/education.actions';

export interface State {
  // if authenticated, there should be a user object
  educations: Education[] | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  educations: null,
  errorMessage: null
};

const educationReducer = createReducer(
  initialState,

  on(EducationActions.loadEducations, (state) => ({...state, errorMessage: null})),
  on(EducationActions.loadEducationsSuccess, (state, props) => ({educations: props.educations, errorMessage: null})),
  on(EducationActions.loadEducationsFail, (state) => ({...state, errorMessage: "failed to load educations"})),

);


