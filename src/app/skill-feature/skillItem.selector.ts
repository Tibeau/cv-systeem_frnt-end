import {createFeatureSelector, createSelector} from "@ngrx/store";
import {selectSkillItems, skillItemFeatureKey, State} from "../store/reducers/skillItem.reducers";

export const selectSkillItemFeature = createFeatureSelector<State>(skillItemFeatureKey);

export const selectMySkillItems = createSelector(selectSkillItemFeature, selectSkillItems);

export const candidateId = localStorage.getItem("id");
