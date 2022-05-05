import {createAction, props} from '@ngrx/store';
import {Language} from "../../models/language/language";
import {LanguagePagination} from "../../models/language/language-pagination";



let type = "[Language]"


//CHANGE LANGUAGE
export const changeLanguage = createAction(
  `${type} changeLanguage`,
  props<{language: Language, id: number}>(),
)

export const changeLanguageSuccess = createAction(
  `${type} changeLanguage SUCCESS`,
)

export const changeLanguageFail = createAction(
  `${type} changeLanguage FAIL`,
  props<{error: any}>()
)



//ADD LANGUAGE
export const addLanguage = createAction(
  `${type} addLanguage`,
  props<{language: Language}>(),
)
export const addLanguageSuccess = createAction(
  `${type} addLanguage SUCCESS`,
)

export const addLanguageFail = createAction(
  `${type} addLanguage FAIL`,
  props<{error: any}>()
)


//LOAD LANGUAGE
export const loadLanguages = createAction(
  `${type} loadLanguage`,
  props<{page: number, items: number}>(),
)
export const loadLanguagesSuccess = createAction(
  `${type} loadLanguages SUCCESS`,
  props<{languages: LanguagePagination}>(),
)

export const loadLanguagesFail = createAction(
  `${type} loadLanguages FAIL`,
  props<{error: any}>()
)

//DELETE LANGUAGE
export const removeLanguage = createAction(
  `${type} removeLanguage`,
  props<{id: number}>(),
)
export const removeLanguageSuccess = createAction(
  `${type} removeLanguage SUCCESS`,
)

export const removeLanguageFail = createAction(
  `${type} removeLanguage FAIL`,
  props<{error: any}>()
)
