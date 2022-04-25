import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../security/user";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import * as educationActions from "../../store/actions/education.actions"
import {Education} from "../../models/education";
import {EducationPagination} from "../../models/education-pagination";


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  api = environment.API_URL;
  BASE_URL = this.api + '/educations';

  constructor(private httpClient: HttpClient) { }

  getEducationsByCandidateId(candidateId: string | null, page: number): Observable<EducationPagination> {
    return this.httpClient.get<EducationPagination>(`${this.BASE_URL}/candidateId=${candidateId}/page=${page}`
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
