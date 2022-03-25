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
  url = this.api + '/users';
  urlpassword = this.api + '/password';
  urlcontact = this.api + '/userSendEmail';

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

  authenticate(user: User): Observable<User> {
    return this.httpClient.post<User>(this.api + '/authenticate', user);
  }
}
