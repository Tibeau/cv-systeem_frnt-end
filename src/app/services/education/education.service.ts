import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Education} from "../../models/education/education";
import {EducationPagination} from "../../models/education/education-pagination";


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  api = environment.API_URL;
  BASE_URL = this.api + '/educations';

  constructor(private httpClient: HttpClient) { }

  getEducationsByCandidateId(candidateId: string | null, page: number, items: number): Observable<EducationPagination> {
    return this.httpClient.get<EducationPagination>(`${this.BASE_URL}/candidateId=${candidateId}/page=${page}/items=${items}`
    );
  }

  getActiveEducationsByCandidateId(candidateId: string | null): Observable<Education[]> {
    return this.httpClient.get<Education[]>(`${this.BASE_URL}/active/candidateId=${candidateId}`
    );
  }


  createEducation(education: Education){
    return this.httpClient.post<Education>(`${this.BASE_URL}`, education);
  }

  putEducation(education: Education, id: number){
    return this.httpClient.put<Education>(`${this.BASE_URL}/${id}`, education);
  }

  deleteEducation(id: number){
    return this.httpClient.delete<Education>(`${this.BASE_URL}/${id}`);
  }


}
