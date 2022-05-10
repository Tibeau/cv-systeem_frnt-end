import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../security/user";
import {Observable} from "rxjs";
import {UserPagination} from "../../models/candidate/candidate-pagination";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  api = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  getCandidates( page: number, items: number): Observable<UserPagination> {
    return this.httpClient.get<UserPagination>(`${this.api}/users/role=CANDIDATE/page=${page}/items=${items}`
    );
  }
}
