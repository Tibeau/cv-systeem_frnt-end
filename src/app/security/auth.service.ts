import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = environment.API_URL;
  BASE_URL = this.api + '/users';

  constructor(private httpClient: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  deleteToken(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.httpClient.post<User>(url, {email, password});
  }
}
