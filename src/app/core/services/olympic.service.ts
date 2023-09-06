import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Olympic } from '../models/Olympic';
import { Nullable } from '../types/Nullable';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$: BehaviorSubject<Nullable<Olympic[]>> = new BehaviorSubject<Nullable<Olympic[]>>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Nullable<Olympic[]>> {
    return this.http.get<Nullable<Olympic[]>>(this.olympicUrl).pipe(
      tap((value: Nullable<Olympic[]>) => this.olympics$.next(value)),
    );
  }

  getOlympics(): Observable<Nullable<Olympic[]>> {
    return this.olympics$.asObservable();
  }
}
