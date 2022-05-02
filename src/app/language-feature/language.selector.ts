import {createFeatureSelector, createSelector} from "@ngrx/store";
import {languageFeatureKey, selectLanguages, State} from "../store/reducers/language.reducers";

export const selectLanguageFeature = createFeatureSelector<State>(languageFeatureKey);

export const selectMyLanguages = createSelector(selectLanguageFeature, selectLanguages);

export const candidateId = localStorage.getItem("id");
