import { Injectable } from '@angular/core';
import { OlympicService } from "../olympic/olympic.service";
import { map, Observable } from 'rxjs';

import { PieChartElement } from '../../models/pie-chart-element';
import { Olympic } from '../../models/olympic';
import { Participation } from '../../models/participation';
import { LineChartSeries } from '../../models/line-chart-series';
import { LineChartElement } from '../../models/line-chart-element';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _olympicService: OlympicService) {
  }

  getPieChartData(): Observable<PieChartElement[]> {
    return this._olympicService.getOlympics().pipe(
      map((olympics: Olympic[]): PieChartElement[] => {
        if(olympics.length === 0 ) {
          throw Error('Empty data')
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
                ),
                "extra": {
                  "id": olympic.id
                }
              }
            )
          }
          return arr;
        }
      ),
    );
  }

  getCountryCount(): Observable<number> {
    return this._olympicService.getOlympics().pipe(
      map((olympics: Olympic[]): number => olympics.length)
    )
  }

  getJOCount(): Observable<number> {
    return this._olympicService.getOlympics().pipe(
      map((olympics: Olympic[]): number => {
          if (olympics.length === 0) {
            throw Error('Empty data')
          }
          const yearSet: Set<number> = new Set<number>();
          for (const olympic of olympics) {
            if (olympic.participations) {
              for (const participation of olympic.participations) {
                yearSet.add(participation.year);
              }
            } else {
              throw Error(`Missing participations for ${olympic.country}`);
            }
          }
          return yearSet.size;
        }
      )
    )
  }

  getCountryName(id: string | null): Observable<string> {
    return this._olympicService.getOlympicByCountryId(id)
      .pipe(
        map((olympic: Olympic): string => olympic.country)
      )
  }

  getParticipationCountByCountryId(id: string | null): Observable<number> {
    return this._olympicService.getOlympicByCountryId(id)
      .pipe(
        map((olympic: Olympic): number =>  this._getParticipations(olympic).length)
    );
  }

  getMedalCountByCountryId(id: string | null): Observable<number> {
    return this._olympicService.getOlympicByCountryId(id).pipe(
      map(
        (olympic: Olympic): number =>  this._getParticipations(olympic).reduce(
          (medals: number, participation: Participation): number => medals + participation.medalsCount,
          0
        )
      )
    );
  }

  getAthleteCountByCountryId(id: string | null): Observable<number> {
    return this._olympicService.getOlympicByCountryId(id).pipe(
      map(
        (olympic: Olympic): number =>  this._getParticipations(olympic).reduce(
          (athletes: number, participation: Participation): number => athletes + participation.athleteCount,
          0
        )
      )
    );
  }

  getLineChartData(id: string | null): Observable<LineChartElement[]> {
    return this._olympicService.getOlympicByCountryId(id).pipe(
      map((olympic: Olympic): LineChartElement[] => {
        const arraySeries: LineChartSeries[] = [];

        for (const participation of this._getParticipations(olympic)) {
            const series: LineChartSeries =
              {
                "name": participation.year.toString(),
                "value": participation.medalsCount
              }
            arraySeries.push(series);
          }
          return [
            {
              "name": olympic.country,
              "series": arraySeries
            }
          ];
        }
      )
    )
  }

  private _getParticipations(olympic: Olympic): Participation[] {
    if (olympic.participations) {
      return olympic.participations
    }
    throw Error(`Missing participations for ${olympic.country}`);
  }
}
