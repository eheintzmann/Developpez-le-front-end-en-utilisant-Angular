import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';

import { DataService } from '../../core/services/data/data.service';
import { Nullable } from '../../core/types/Nullable';
import { LineChartElement } from '../../core/models/line-chart-element';

type HomeData = {
  "countryName": string,
  "participationCount": Nullable<number>,
  "medalCount": Nullable<number>,
  "athleteCount": Nullable<number>,
  "lineChart": Nullable<LineChartElement[]>
};
export const countryDetailResolver: ResolveFn<HomeData> = (route, state) => {

  const dataService: DataService = inject(DataService);

  const id: number = Number(route.paramMap.get('id'));
  if (!Number.isInteger(id)) {
    throw Error(`Error 400 - Bad Request - Invalid country id : ${route.paramMap.get('id')}`);
  }

  return forkJoin({
    "countryName": dataService.getCountryName(id),
    "participationCount": dataService.getParticipationCountByCountryId(id),
    "medalCount": dataService.getMedalCountByCountryId(id),
    "athleteCount": dataService.getAthleteCountByCountryId(id),
    "lineChart": dataService.getLineChartData(id)
  });

}
