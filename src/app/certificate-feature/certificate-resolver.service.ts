import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {CertificateService} from "../services/certificate/certificate.service";

@Injectable({
  providedIn: 'root'
})
export class CertificateResolverService implements Resolve<any> {
  constructor(private certificate: CertificateService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get certificate in resolver...', route);
    return this.certificate.getCertificatesByCandidateId(localStorage.getItem('id'),0).pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}
