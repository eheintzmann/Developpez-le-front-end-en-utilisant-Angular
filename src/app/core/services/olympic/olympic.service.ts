import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Olympic } from '../../models/olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl: string = './assets/mock/olympic.json';

  constructor(private _http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this._http.get<Olympic[]>(this.olympicUrl);
  }

  getOlympicByCountryId(id: number): Observable<Olympic> {
    return this._http.get<Olympic>(`${this.olympicUrl}/${id}`);
  }
}
