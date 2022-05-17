import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectSkills, skillFeatureKey, State} from "../store/reducers/skill.reducers";

export const selectSkillFeature = createFeatureSelector<State>(skillFeatureKey);

export const selectMySkills = createSelector(selectSkillFeature, selectSkills);
