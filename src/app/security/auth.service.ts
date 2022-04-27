import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  deleteToken(): void {
    localStorage.clear();
  }


  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.api}/users/${id}`);
  }

  logIn(email: string, password: string): Observable<any> {
    return this.httpClient.post<User>(`${this.api}/authenticate`, {email, password}
    );
  }
}
