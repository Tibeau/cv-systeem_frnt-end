import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {CandidateService} from "../../services/candidate/candidate.service";
import {
  addCandidate,
  addCandidateFail,
  addCandidateSuccess,
  changeCandidate, changeCandidateFail,
  changeCandidateSuccess
} from "../actions/candidate.actions";


@Injectable()
export class CandidateEffects {

  constructor(
    private actions$: Actions,
    private candidateService: CandidateService,
  ) {}



  addCandidate$ = createEffect(() => this.actions$.pipe(
    ofType(addCandidate),
    switchMap(({candidate}) => this.candidateService.createCandidate(candidate)
      .pipe(
        map(candidate => ( addCandidateSuccess({candidate: candidate}))),
        catchError(() => of(addCandidateFail))
      )))
  );


  changeCandidate$ = createEffect(() => this.actions$.pipe(
    ofType(changeCandidate),
    switchMap((({candidate, id}) => this.candidateService.putCandidate(candidate, id)
      .pipe(
        map(candidate => ( changeCandidateSuccess())),
        catchError(() => of(changeCandidateFail)),
      )))
  ));

}
