import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {UserService} from "../../services/user/user.service";
import {loadCandidates, loadCandidatesFail, loadCandidatesSuccess} from "../actions/user.actions";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private candidateService: UserService,
  ) {}


  getCandidates$ = createEffect(() => this.actions$.pipe(
    ofType(loadCandidates),
    switchMap((({page, items}) => this.candidateService.getCandidates(page, items)
      .pipe(
        map(users => ( loadCandidatesSuccess({users}) )),
        catchError(() => of(loadCandidatesFail))
      )))
  ));

}
