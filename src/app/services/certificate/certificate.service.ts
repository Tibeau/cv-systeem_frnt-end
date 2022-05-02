import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CertificatePagination} from "../../models/certificate/certificate-pagination";
import {Certificate} from "../../models/certificate/certificate";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  api = environment.API_URL;
  BASE_URL = this.api + '/certificates';

  constructor(private httpClient: HttpClient) { }

  getCertificatesByCandidateId(candidateId: string | null, page: number): Observable<CertificatePagination> {
    return this.httpClient.get<CertificatePagination>(`${this.BASE_URL}/candidateId=${candidateId}/page=${page}`
    );
  }

  createCertificate(certificate: Certificate){
    return this.httpClient.post<Certificate>(`${this.BASE_URL}`, certificate);
  }

  putCertificate(certificate: Certificate, id: number){
    return this.httpClient.put<Certificate>(`${this.BASE_URL}/${id}`, certificate);
  }

  deleteCertificate(id: number){
    console.log(id)
    return this.httpClient.delete<Certificate>(`${this.BASE_URL}/${id}`);
  }

}
