import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SkillItem} from "../../models/skillItem/skillItem";

@Injectable({
  providedIn: 'root'
})
export class SkillItemService {
  api = environment.API_URL;
  BASE_URL = this.api + '/skillItems';

  constructor(private httpClient: HttpClient) { }

  getSkillsByCandidateId(id: string | null): Observable<SkillItem[]> {
    return this.httpClient.get<SkillItem[]>(`${this.BASE_URL}/candidateId=${id}`
    );
  }

  createSkillItem(skillItem: SkillItem){
    return this.httpClient.post<SkillItem>(`${this.BASE_URL}`, skillItem);
  }

  putSkillItem(skillItem: SkillItem, id: number){
    return this.httpClient.put<SkillItem>(`${this.BASE_URL}/${id}`, skillItem);
  }

  deleteSkillItem(id: number){
    return this.httpClient.delete<SkillItem>(`${this.BASE_URL}/${id}`);
  }
}
