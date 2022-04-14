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
    const url = `${this.BASE_URL}`;
    console.log(url + '/candidateId=' + candidateId
      + '/page=' + page);
    return this.httpClient.get<EducationPagination>(url + '/candidateId=' + candidateId
      + '/page=' + page
    );
  }

  createEducation(education: Education){
    const url = `${this.BASE_URL}`;
    console.log("created on " + url);
    return this.httpClient.post<Education>(url, education
    );
  }

  putEducation(education: Education, id: number){
    const url = `${this.BASE_URL}/` + id;
    console.log("changed on " +url);
    return this.httpClient.put<Education>(url, education
    );
  }

  deleteEducation(id: number){
    const url = `${this.BASE_URL}/` + id;
    console.log("deleted on " +url);
    return this.httpClient.delete<Education>(url);
  }


}
