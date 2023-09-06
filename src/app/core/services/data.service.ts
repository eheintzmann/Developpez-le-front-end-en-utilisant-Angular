import { Injectable } from '@angular/core';
import { OlympicService } from "./olympic.service";
import { map, Observable } from 'rxjs';

import { Nullable } from '../types/Nullable';
import { PieChartElement } from '../models/PieChartElement';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private olympicService: OlympicService) { }

  getPieChartData(): Observable<Nullable<PieChartElement[]>> {
    return this.olympicService.getOlympics().pipe(
    map((olympics: Nullable<Olympic[]>): Nullable<PieChartElement[]> => {
          if (!olympics) {
            return olympics
          }
          const arr: PieChartElement[] = []
          for (const olympic of olympics) {
              if (!olympic.participations) {
                throw Error(`Missing participations for ${olympic.country}`);
              }
              arr.push(
                  {
                    "name": olympic.country,
                    "value": olympic.participations.reduce(
                      (acc2: number, participation: Participation) => acc2 + participation.medalsCount
                      , 0
                    )
                  }
              )
          }
          return arr;
        }
      ),
    );
  }

  getCountriesCount(): Observable<Nullable<number>> {
    return this.olympicService.getOlympics().pipe(
      map((olympics: Nullable<Olympic[]>): Nullable<number> => (olympics)  ? olympics.length : olympics)
    )
  }

  getJOsCount(): Observable<Nullable<number>> {
    return this.olympicService.getOlympics().pipe(
      map((olympics: Nullable<Olympic[]>): Nullable<number> => {
          if (olympics) {
            const yearsSet: Set<number> = new Set();
            for (const olympic of olympics) {
              if (olympic.participations) {
                for (const participation of olympic.participations) {
                  yearsSet.add(participation.year);
                }
              } else {
                return null;
              }
            }
            return yearsSet.size;
          }
          return olympics;
        }
      )
    )
  }

}
