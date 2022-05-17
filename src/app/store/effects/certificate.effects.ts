import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, catchError, tap, switchMap} from 'rxjs/operators';
import {
  changeEducationSuccess,
  addEducationFail,
  removeEducationFail,
  removeEducationSuccess
} from "../actions/education.actions";
import {candidateId} from "../../selectors/auth.selector";
import {CertificateService} from "../../services/certificate/certificate.service";
import {
  addCertificate, addCertificateSuccess, changeCertificate, changeCertificateFail,
  loadCertificates,
  loadCertificatesFail,
  loadCertificatesSuccess, removeCertificate
} from "../actions/certificate.actions";

@Injectable()
export class CertificateEffects {

  constructor(
    private actions$: Actions,
    private certificateService: CertificateService,
  ) {}


  getCertificates$ = createEffect(() => this.actions$.pipe(
    ofType(loadCertificates),
    switchMap((({page, items}) => this.certificateService.getCertificatesByCandidateId(candidateId, page, items)
      .pipe(
        map(certificates => ( loadCertificatesSuccess({certificates}) )),
        catchError(() => of(loadCertificatesFail))
      )))
  ));


  addCertificate$ = createEffect(() => this.actions$.pipe(
    ofType(addCertificate),
    switchMap(({certificate}) => this.certificateService.createCertificate(certificate)
      .pipe(
        map(education => ( addCertificateSuccess())),
        catchError(() => of(addEducationFail)),
        map(education => (loadCertificates({page: 0, items: 3})))
      )))
  );


  changeCertificate$ = createEffect(() => this.actions$.pipe(
    ofType(changeCertificate),
    switchMap((({certificate, id}) => this.certificateService.putCertificate(certificate, id)
      .pipe(
        map(education => ( changeEducationSuccess())),
        catchError(() => of(changeCertificateFail)),
        map(education => (loadCertificates({page: 0, items: 3})))
      )))
  ));

  removeCertificate$ = createEffect(() => this.actions$.pipe(
    ofType(removeCertificate),
    switchMap(({id}) => this.certificateService.deleteCertificate(id)
      .pipe(
        map(education => ( removeEducationSuccess() )),
        catchError(() => of(removeEducationFail)),
        map(education => (loadCertificates({page: 0, items: 3})))
      )))
  );
}
