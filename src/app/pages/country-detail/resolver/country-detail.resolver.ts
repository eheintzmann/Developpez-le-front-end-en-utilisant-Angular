import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';

import { DataService } from '../../../core/services/data/data.service';
import { CountryDetailData } from '../model/country-detail-data';


export const countryDetailResolver: ResolveFn<CountryDetailData> = (route: ActivatedRouteSnapshot) => {
  const dataService: DataService = inject(DataService);
  const countryId: string | null = route.paramMap.get('id');

  return forkJoin({
    countryName: dataService.getCountryName(countryId),
    participationCount: dataService.getParticipationCountByCountryId(countryId),
    medalCount: dataService.getMedalCountByCountryId(countryId),
    athleteCount: dataService.getAthleteCountByCountryId(countryId),
    lineChart: dataService.getLineChartData(countryId)
  });

}
