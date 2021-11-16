import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  constructor(private httpClient: HttpClient) {}

  post$ = (endPoint: string, body: any): Observable<T> =>
    this.httpClient.post<T>(
      `${environment.BASE_API_URL}${environment.EMAIL_LOJA}${endPoint}`,
      body
    );

  put$ = (endPoint: string, body: any): Observable<T> =>
    this.httpClient.put<T>(
      `${environment.BASE_API_URL}${environment.EMAIL_LOJA}${endPoint}`,
      body
    );

  delete$ = (endPoint: string): Observable<T> =>
    this.httpClient.delete<T>(
      `${environment.BASE_API_URL}${environment.EMAIL_LOJA}${endPoint}`
    );

  get$ = (endPoint: string, params?: HttpParams): Observable<T> =>
    this.httpClient.get<T>(
      `${environment.BASE_API_URL}${environment.EMAIL_LOJA}${endPoint}`,
      { params }
    );
}
