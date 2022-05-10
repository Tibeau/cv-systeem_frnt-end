import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {CandidateService} from "../../services/candidates/candidate.service";
import {loadCandidates, loadCandidatesFail, loadCandidatesSuccess} from "../actions/candidate.actions";

@Injectable()
export class CandidateEffects {

  constructor(
    private actions$: Actions,
    private candidateService: CandidateService,
  ) {}


  getCandidates$ = createEffect(() => this.actions$.pipe(
    ofType(loadCandidates),
    switchMap((({page, items}) => this.candidateService.getCandidates(page, items)
      .pipe(
        map(candidates => ( loadCandidatesSuccess({candidates}) )),
        catchError(() => of(loadCandidatesFail))
      )))
  ));

}
