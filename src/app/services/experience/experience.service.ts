import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExperiencePagination} from "../../models/experience/experience-pagination";
import {Experience} from "../../models/experience/experience";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  api = environment.API_URL;
  BASE_URL = this.api + '/experiences';

  constructor(private httpClient: HttpClient) { }

  getExperiencesByCandidateId(candidateId: string | null, page: number): Observable<ExperiencePagination> {
    return this.httpClient.get<ExperiencePagination>(`${this.BASE_URL}/candidateId=${candidateId}/page=${page}`
    );
  }

  createExperience(experience: Experience){
    return this.httpClient.post<Experience>(`${this.BASE_URL}`, experience);
  }

  putExperience(experience: Experience, id: number){
    return this.httpClient.put<Experience>(`${this.BASE_URL}/${id}`, experience);
  }

  deleteExperience(id: number){
    return this.httpClient.delete<Experience>(`${this.BASE_URL}/${id}`);
  }

}
