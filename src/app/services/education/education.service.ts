import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../security/user";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import * as educationActions from "../../store/actions/education.actions"


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  api = environment.API_URL;
  BASE_URL = this.api + '/educations';

  constructor(private httpClient: HttpClient) { }

  getEducationsByCandidateId(candidateId: string) {
    const url = `${this.BASE_URL}/candidateId=`;
    console.log(url);
    return this.httpClient.get(url + candidateId
    );
  }
}
