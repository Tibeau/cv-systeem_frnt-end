import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SkillPagination} from "../../models/skill/skill-pagination";
import {Skill} from "../../models/skill/skill";


@Injectable({
  providedIn: 'root'
})
export class SkillService {

  api = environment.API_URL;
  BASE_URL = this.api + '/skills';

  constructor(private httpClient: HttpClient) { }

  getSkillsByCandidateId(candidateId: string | null, page: number, items: number): Observable<SkillPagination> {
    return this.httpClient.get<SkillPagination>(`${this.BASE_URL}/candidateId=${candidateId}/page=${page}/items=${items}`
    );
  }

  createSkill(skill: Skill){
    return this.httpClient.post<Skill>(`${this.BASE_URL}`, skill);
  }

  putSkill(skill: Skill, id: number){
    return this.httpClient.put<Skill>(`${this.BASE_URL}/${id}`, skill);
  }

  deleteSkill(id: number){
    return this.httpClient.delete<Skill>(`${this.BASE_URL}/${id}`);
  }
}
