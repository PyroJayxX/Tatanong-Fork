import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, FlashcardDeck } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: Options): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, body: FlashcardDeck, options?: Options): Observable<T> {
    return this.http.post<T>(url, body, options) as Observable<T>;
  }

  put<T>(url: string, body: FlashcardDeck, options?: Options): Observable<T> {
    return this.http.put<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options?: Options): Observable<T> {
    return this.http.delete<T>(url, options) as Observable<T>;
  }
}
