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

  getCountryName(id: number): Observable<string> {
    return this._olympicService.getOlympics().pipe(
      map((olympics: Olympic[]): string => {
            const olympic = olympics.filter((element: Olympic): boolean => element.id == id)[0];
            if (!olympic) {
              throw Error(`Country id: ${id} does not exist`);
            }
            return olympic.country;
        }
      )
    )
  }

  getParticipationCountByCountryId(id: number): Observable<number> {
    return this._olympicService.getOlympics().pipe(
      map((olympics: Olympic[]): number => this.getParticipationsPerCountry(olympics, id).length)
    );
  }

  getMedalCountByCountryId(id: number): Observable<number> {
    return this._olympicService.getOlympics().pipe(
      map(
        (olympics: Olympic[]): number => this.getParticipationsPerCountry(olympics, id).reduce(
          (medals: number, participation: Participation): number => medals + participation.medalsCount,
          0
        )
      )
    );
  }

  getAthleteCountByCountryId(id: number): Observable<number> {
    return this._olympicService.getOlympics().pipe(
      map(
        (olympics: Olympic[]): number => this.getParticipationsPerCountry(olympics, id).reduce(
          (athletes: number, participation: Participation): number => athletes + participation.athleteCount,
          0
        )
      )
    );
  }

  getLineChartData(id: number): Observable<LineChartElement[]> {
    return this._olympicService.getOlympics().pipe(
      map((olympics: Olympic[]): LineChartElement[] => {
          const olympic = olympics.filter((element: Olympic): boolean => element.id == id)[0];
          if (olympics) {
            const olympic = olympics.filter((element: Olympic): boolean => element.id == id)[0];
            if (!olympic) {
              throw Error(`Country id: ${id} does not exist`);
            }
          }
          if (olympic.participations) {
            const arraySeries: LineChartSeries[] = [];

            for (const participation of olympic.participations) {
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
          throw Error(`Missing participations for Country Id : ${id}`);
        }
      )
    )
  }

  private getParticipationsPerCountry(olympics: Olympic[], id: number): Participation[] {
    const olympic = olympics.filter((element: Olympic): boolean => element.id == id)[0];
    if (!olympic) {
      throw Error(`Country id: ${id} does not exist`);
    }
    if (olympic.participations) {
      return olympic.participations;
    }
    throw Error(`Missing participations for ${olympic.country}`);
  }
}
