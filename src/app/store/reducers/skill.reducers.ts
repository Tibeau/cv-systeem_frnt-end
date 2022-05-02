import {createReducer, on} from "@ngrx/store";
import {SkillPagination} from "../../models/skill/skill-pagination";
import {
  changeSkill,
  changeSkillFail,
  changeSkillSuccess,
  loadSkills, loadSkillsFail, loadSkillsSuccess
} from "../actions/skill.actions";

export const skillFeatureKey = "skills";

export const selectSkills = (state: State) => state.skills

export const selectSkill = (state: State) => state.skills


export interface State {
  skills: SkillPagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  skills: null,
  errorMessage: null,
};

export const skillReducer = createReducer(
  initialState,
  on(loadSkills, (state) => ({skills: null, errorMessage: "loading skills"})),
  on(loadSkillsSuccess, (state, props) => ({skills: props.skills, errorMessage: "loaded skills successfully"})),
  on(loadSkillsFail, (state) => ({skills: null, errorMessage: "failed to load skills"})),

  on(changeSkill, (state) => ({skills: null, errorMessage: "changing skills"})),
  on(changeSkillSuccess, (state) => ({skills: null, errorMessage: "changed skills successfully"})),
  on(changeSkillFail, (state) => ({skills: null, errorMessage: "failed to change skills"})),

);


