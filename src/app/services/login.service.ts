import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(user: any): Observable<string> {
    return this.httpClient.post("/auth/login", user, {responseType: "text"})
  }
}
