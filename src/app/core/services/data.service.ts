import { Injectable } from '@angular/core';
import { OlympicService } from "./olympic.service";
import { map, Observable } from 'rxjs';

import { Nullable } from '../types/Nullable';
import { PieChartElement } from '../models/pie-chart-element';
import { Olympic } from '../models/olympic';
import { Participation } from '../models/participation';
import { LineChartSeries } from '../models/line-chart-series';
import { LineChartElement } from '../models/line-chart-element';


@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private _olympicService: OlympicService) {
    }

    getPieChartData(): Observable<Nullable<PieChartElement[]>> {
        return this._olympicService.getOlympics().pipe(
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

    getCountryCount(): Observable<Nullable<number>> {
        return this._olympicService.getOlympics().pipe(
            map((olympics: Nullable<Olympic[]>): Nullable<number> => (olympics) ? olympics.length : olympics)
        )
    }

    getJOCount(): Observable<Nullable<number>> {
        return this._olympicService.getOlympics().pipe(
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

    getCountryName(id: number): Observable<string> {
        return this._olympicService.getOlympics().pipe(
            map((olympics: Nullable<Olympic[]>): string => {
                    if (olympics) {
                        const olympic = olympics.filter((element: Olympic): boolean => element.id == id)[0];
                        if (!olympic) {
                            throw Error(`Country id: ${id} does not exist`);
                        }
                        return olympic.country
                    }
                    return 'Unknown';
                }
            )
        )
    }

    getParticipationCountByCountryId(id: number): Observable<Nullable<number>> {
        return this._olympicService.getOlympics().pipe(
            map(
                (olympics: Nullable<Olympic[]>): Nullable<number> => {
                    const participations: Nullable<Participation[]> = this.getParticipationsPerCountry(olympics, id);
                    return participations ?
                        participations.length :
                        participations;
                }
            )
        );
    }

    getMedalCountByCountryId(id: number): Observable<Nullable<number>> {
        return this._olympicService.getOlympics().pipe(
            map(
                (olympics: Nullable<Olympic[]>): Nullable<number> => {
                    const participations: Nullable<Participation[]> = this.getParticipationsPerCountry(olympics, id);

                    return participations ?
                        participations.reduce(
                            (medals: number, participation: Participation): number => medals + participation.medalsCount,
                            0
                        ) :
                        participations;
                }
            )
        );
    }

    getAthleteCountByCountryId(id: number): Observable<Nullable<number>> {
        return this._olympicService.getOlympics().pipe(
            map(
                (olympics: Nullable<Olympic[]>): Nullable<number> => {

                    const participations: Nullable<Participation[]> = this.getParticipationsPerCountry(olympics, id);

                    return participations ?
                        participations.reduce(
                            (athletes: number, participation: Participation): number => athletes + participation.athleteCount,
                            0
                        ) :
                        participations;
                }
            )
        );
    }

    getLineChartData(id: number): Observable<LineChartElement[]> {
        return this._olympicService.getOlympics().pipe(
            map((olympics: any): LineChartElement[] => {

                    if (!olympics) {
                        return olympics;
                    }
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

    private getParticipationsPerCountry(olympics: Nullable<Olympic[]>, id: number): Nullable<Participation[]> {
        if (!olympics) {
            return olympics;
        }
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
