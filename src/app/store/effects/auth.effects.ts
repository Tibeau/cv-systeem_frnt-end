import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Actions, ofType, createEffect, Effect} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "../../security/auth.service";
import {
  login, logInFailure, logInSuccess, logout,
} from '../actions/auth.actions';
import {of} from 'rxjs';
import {EducationService} from "../../services/education/education.service";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private educationService: EducationService,
    private authService: AuthService,
    private router: Router,
  ) {}


  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    tap(() => {
    }),
    switchMap((({payload}) => this.authService.logIn(payload.email, payload.password)
      .pipe(
        map((user) => (logInSuccess({token: user.token, email: payload.email, id: user.id}))),
        catchError(() => of(logInFailure))
      )))
  ));



  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(logInSuccess),
    tap((user) => {
      localStorage.setItem('token', JSON.stringify(user.token));
      localStorage.setItem('id', JSON.stringify(user.id))
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });;
    },
      catchError(() => of(logInFailure)))
  ),
    { dispatch: false });


  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType(logInFailure),
  ));


  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.router.navigate(['/login']);
    },
      catchError(() => of(logInFailure)))
  ),
    { dispatch: false });

}

