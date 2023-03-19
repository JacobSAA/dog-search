import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';


export const baseURL = "https://frontend-take-home-service.fetch.com"


@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const partialUrl = httpRequest.url
    return next.handle(httpRequest.clone({
        url: baseURL + partialUrl,
        setHeaders: {"fetch-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s"},
        withCredentials: true
    }));
  }
}