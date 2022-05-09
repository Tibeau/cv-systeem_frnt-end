import {createReducer, on} from "@ngrx/store";
import {
  changeSkillItem,
  changeSkillItemFail,
  changeSkillItemSuccess,
  loadSkillItems, loadSkillItemsFail, loadSkillItemsSuccess
} from "../actions/skillItem.actions";
import {SkillItem} from "../../models/skillItem/skillItem";

export const skillItemFeatureKey = "skillItems";

export const selectSkillItems = (state: State) => state.skillItems

export interface State {
  skillItems: SkillItem[] | null;
  errorMessage: string | null;
}

export const initialState: State = {
  skillItems: null,
  errorMessage: null,
};

export const skillItemReducer = createReducer(
  initialState,
  on(loadSkillItems, (state) => ({skillItems: null, errorMessage: "loading skillItems"})),
  on(loadSkillItemsSuccess, (state, props) => ({skillItems: props.skillItems, errorMessage: "loaded skillItems successfully"})),
  on(loadSkillItemsFail, (state) => ({skillItems: null, errorMessage: "failed to load skillItems"})),

  on(changeSkillItem, (state) => ({skillItems: null, errorMessage: "changing skillItems"})),
  on(changeSkillItemSuccess, (state) => ({skillItems: null, errorMessage: "changed skillItems successfully"})),
  on(changeSkillItemFail, (state) => ({skillItems: null, errorMessage: "failed to change skillItems"})),

);


