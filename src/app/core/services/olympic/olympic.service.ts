import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Olympic } from '../../models/olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private _olympicUrl: string = './assets/mock/olympic.json';

  constructor(private _http: HttpClient) {
  }

  getOlympics(): Observable<Olympic[]> {
    return this._http.get<Olympic[]>(this._olympicUrl);
  }

  getOlympicByCountryId(id: string | null ): Observable<Olympic> {
    return this.getOlympics()
      .pipe(
        map((olympics: Olympic[]) => {
          const arr: Olympic[] = olympics.filter((olympic: Olympic) => olympic.id.toString() === id);

          if (arr.length < 1) {
            throw new HttpErrorResponse({
              status: 400,
              statusText: `Invalid Country ID : ${id}`
            })
          }
          if (arr.length > 1) {
            throw new Error(`Duplicate Country ID : ${id}`);
          }
          return arr[0];
        })
      )
  }

}
