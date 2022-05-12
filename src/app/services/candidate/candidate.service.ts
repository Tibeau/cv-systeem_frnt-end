import { Injectable } from '@angular/core';
import {Candidate} from "../../models/candidate/candidate";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  api = environment.API_URL;
  BASE_URL = this.api + '/candidates';

  constructor(private httpClient: HttpClient) { }

  createCandidate(candidate: Candidate){
    return this.httpClient.post<Candidate>(`${this.BASE_URL}`, candidate);
  }

  putCandidate(candidate: Candidate, id: number){
    return this.httpClient.put<Candidate>(`${this.BASE_URL}/${id}`, candidate);
  }
}
