import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';

import { DataService } from '../../core/services/data/data.service';
import { LineChartElement } from '../../core/models/line-chart-element';

type CountryDetailData = {
  "countryName": string,
  "participationCount": number,
  "medalCount": number,
  "athleteCount": number,
  "lineChart": LineChartElement[]
};

export const countryDetailResolver: ResolveFn<CountryDetailData> = (route, state) => {
  const dataService: DataService = inject(DataService);
  const countryId: string | null = route.paramMap.get('id');

  return forkJoin({
    "countryName": dataService.getCountryName(countryId),
    "participationCount": dataService.getParticipationCountByCountryId(countryId),
    "medalCount": dataService.getMedalCountByCountryId(countryId),
    "athleteCount": dataService.getAthleteCountByCountryId(countryId),
    "lineChart": dataService.getLineChartData(countryId)
  });

}
