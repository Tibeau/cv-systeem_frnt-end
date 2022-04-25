import { Injectable } from '@angular/core';
//import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "../../security/auth.service";
import {EMPTY, Observable, of} from "rxjs";
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure, LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}



  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
          .pipe(map((user) => {
              localStorage.setItem('token', JSON.stringify(user.token));
              localStorage.setItem('id', JSON.stringify(user.id));
              return new LogInSuccess({token: user.token, email: payload.email});
            }),
            catchError((error) => {
              return of(new LogInFailure({ error: error }));
            })
          );
      }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user) //payload token
      this.router.navigateByUrl('/').then(() => {
              window.location.reload();
            });;
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    })
  );
}
