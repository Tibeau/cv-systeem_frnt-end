import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {candidateId} from "../../education-feature/education.selector";
import {LanguageService} from "../../services/language/language.service";
import {
  addLanguageSuccess,
  addLanguage,
  addLanguageFail,
  changeLanguage,
  loadLanguages,
  loadLanguagesFail,
  loadLanguagesSuccess,
  changeLanguageSuccess,
  removeLanguageFail,
  removeLanguageSuccess,
  removeLanguage,
  changeLanguageFail
} from "../actions/language.actions";

@Injectable()
export class LanguageEffects{

  constructor(
    private actions$: Actions,
    private languageService: LanguageService,
  ) {}


  getLanguages$ = createEffect(() => this.actions$.pipe(
    ofType(loadLanguages),
    switchMap((({page}) => this.languageService.getLanguagesByCandidateId(candidateId, page)
      .pipe(
        map(languages => ( loadLanguagesSuccess({languages}) )),
        catchError(() => of(loadLanguagesFail))
      )))
  ));


  addLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(addLanguage),
    switchMap(({language}) => this.languageService.createLanguage(language)
      .pipe(
        map(language => ( addLanguageSuccess())),
        catchError(() => of(addLanguageFail)),
        map(language => (loadLanguages({page: 0})))
      )))
  );


  changeLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(changeLanguage),
    switchMap((({language, id}) => this.languageService.putLanguage(language, id)
      .pipe(
        map(language => ( changeLanguageSuccess())),
        catchError(() => of(changeLanguageFail)),
        map(language => (loadLanguages({page: 0})))
      )))
  ));

  removeLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(removeLanguage),
    switchMap(({id}) => this.languageService.deleteLanguage(id)
      .pipe(
        map(language => ( removeLanguageSuccess() )),
        catchError(() => of(removeLanguageFail)),
        map(language => (loadLanguages({page: 0})))
      )))
  );
}
