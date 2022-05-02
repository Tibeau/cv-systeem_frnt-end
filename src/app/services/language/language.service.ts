import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LanguagePagination} from "../../models/language/language-pagination";
import {Language} from "../../models/language/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  api = environment.API_URL;
  BASE_URL = this.api + '/languages';

  constructor(private httpClient: HttpClient) { }

  getLanguagesByCandidateId(candidateId: string | null, page: number): Observable<LanguagePagination> {
    return this.httpClient.get<LanguagePagination>(`${this.BASE_URL}/candidateId=${candidateId}/page=${page}`
    );
  }

  createLanguage(langauge: Language){
    return this.httpClient.post<Language>(`${this.BASE_URL}`, langauge);
  }

  putLanguage(langauge: Language, id: number){
    return this.httpClient.put<Language>(`${this.BASE_URL}/${id}`, langauge);
  }

  deleteLanguage(id: number){
    return this.httpClient.delete<Language>(`${this.BASE_URL}/${id}`);
  }

}
