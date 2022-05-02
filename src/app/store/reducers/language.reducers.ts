import {createReducer, on} from "@ngrx/store";
import {LanguagePagination} from "../../models/language/language-pagination";
import {
  changeLanguage,
  changeLanguageFail,
  changeLanguageSuccess,
  loadLanguages, loadLanguagesFail, loadLanguagesSuccess
} from "../actions/language.actions";

export const languageFeatureKey = "languages";

export const selectLanguages = (state: State) => state.languages

export const selectLanguage = (state: State) => state.languages


export interface State {
  languages: LanguagePagination | null;
  errorMessage: string | null;
}

export const initialState: State = {
  languages: null,
  errorMessage: null,
};

export const languageReducer = createReducer(
  initialState,
  on(loadLanguages, (state) => ({languages: null, errorMessage: "loading languages"})),
  on(loadLanguagesSuccess, (state, props) => ({languages: props.languages, errorMessage: "loaded languages successfully"})),
  on(loadLanguagesFail, (state) => ({languages: null, errorMessage: "failed to load languages"})),

  on(changeLanguage, (state) => ({languages: null, errorMessage: "changing languages"})),
  on(changeLanguageSuccess, (state) => ({languages: null, errorMessage: "changed languages successfully"})),
  on(changeLanguageFail, (state) => ({languages: null, errorMessage: "failed to change languages"})),

);


