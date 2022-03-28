import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "../../security/auth.service";
import {Observable, of} from "rxjs";
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
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
              console.log(user);
              return new LogInSuccess({token: user.token, email: payload.email});
            }),
            catchError((error) => {
              console.log(error);
              return of(new LogInFailure({ error: error }));
            })
          );
      }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user) //payload token
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );
}
