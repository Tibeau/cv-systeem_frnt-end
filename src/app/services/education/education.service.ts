import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../security/user";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import * as educationActions from "../../store/actions/education.actions"
import {Education} from "../../models/education";


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  api = environment.API_URL;
  BASE_URL = this.api + '/educations';

  constructor(private httpClient: HttpClient) { }

  getEducationsByCandidateId(candidateId: string | null): Observable<Education[]> {
    const url = `${this.BASE_URL}/candidateId=`;
    console.log(url + candidateId);
    return this.httpClient.get<Education[]>(url + candidateId
    );
  }

  createEducation(education: Education){
    const url = `${this.BASE_URL}`;
    console.log("created on " + url);
    console.log(education)
    console.log(education.school)
    return this.httpClient.post<Education>(url, education
    );
  }

  putEducation(education: Education, id: number){
    const url = `${this.BASE_URL}/` + id;
    console.log("changed on " +url);
    console.log(education)
    console.log(education.school)
    return this.httpClient.put<Education>(url, education
    );
  }
}
