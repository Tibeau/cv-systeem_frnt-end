import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Actions, ofType, createEffect, Effect} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "../../security/auth.service";
import {
  loadUser, loadUserSuccess, loadUserFailure,
  login, logInFailure, logInSuccess, logout, changeUserSuccess, changeUser, changeUserFail
} from '../actions/auth.actions';
import {of} from 'rxjs';
import {EducationService} from "../../services/education/education.service";
import {User} from "../../security/user";

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
    switchMap((({payload}) => this.authService.logIn(payload.email, payload.password)
      .pipe(
        map((user: User) =>
          (logInSuccess({user})
          )),
        catchError(() => of(logInFailure))
    )))
  ));


  changeUser$ = createEffect(() => this.actions$.pipe(
    ofType(changeUser),
    switchMap((({user, id}) => this.authService.putUser(user, id)
      .pipe(
        map(user => (loadUser({id: Number(user.id)})),
        catchError(() => of(changeUserFail))

      )))
  )));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(logInSuccess),
    tap(({user}) => {
      if (user.role === "CANDIDATE") {
        localStorage.setItem('CANDIDATE', JSON.stringify(user.id));
      } else if (user.role === "COMPANY") {
        localStorage.setItem('COMPANY', JSON.stringify(user.id));
      }
      localStorage.setItem('token', JSON.stringify(user.token));
      map( () => (loadUser({id: Number(user.id)})));
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
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
      console.log('print')
      localStorage.removeItem('token');
      localStorage.removeItem('CANDIDATE');
        localStorage.removeItem('COMPANY');
        this.router.navigate(['/login']);
    },
      catchError(() => of(logInFailure)))
  ),
    { dispatch: false });


  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    switchMap((({id}) => this.authService.getUserById(id)
      .pipe(
        map(user => ( loadUserSuccess({user}) )),
        catchError(() => of(loadUserFailure))
      )))
  ));

}

