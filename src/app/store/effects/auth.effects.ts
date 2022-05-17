import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from "../../security/auth.service";
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  changeNewUser,
  changeUser,
  changeUserFail,
  changeUserSuccess,
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  login,
  logInFailure,
  logInSuccess,
  logout
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
  ) {
  }

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


  changeNewUser$ = createEffect(() => this.actions$.pipe(
    ofType(changeNewUser),
    switchMap((({user, id}) => this.authService.putUser(user, id)
      .pipe(
        map(user => (changeUserSuccess()),
          catchError(() => of(changeUserFail))
        )))
    )));


  loginSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(logInSuccess),
      tap(({user}) => {
        if (user.role === 'CANDIDATE') {
          localStorage.setItem('Candidate', JSON.stringify(user.candidateId));
        }else if (user.role === 'COMPANY') {
          localStorage.setItem('Company', JSON.stringify(user.companyId));
        }

          localStorage.setItem('user', JSON.stringify(user.id));
          localStorage.setItem('token', JSON.stringify(user.token));
          map(() => (loadUser({id: Number(user.id)})));
          if (user.firstLogin === false) {
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload();
            });
          } else if (user.firstLogin === true) {
            this.router.navigate(['/contactinfo']).then(() => {
              window.location.reload();
            });
          }
        },
        catchError(() => of(logInFailure)))
    ),
    {dispatch: false});
  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType(logInFailure),
  ));


  logout$ = createEffect(() => this.actions$.pipe(
      ofType(logout),
      tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('Candidate');
          localStorage.removeItem('Company');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        },
        catchError(() => of(logInFailure)))
    ),
    {dispatch: false});


  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    switchMap((({id}) => this.authService.getUserById(id)
      .pipe(
        map(user => (loadUserSuccess({user}))),
        catchError(() => of(loadUserFailure))
      )))
  ));


  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(addUser),
    switchMap(({user}) => this.authService.createUSer(user)
      .pipe(
        map(user => (addUserSuccess({user: user}))),
        catchError(() => of(addUserFailure())),
      )))
  );
}

