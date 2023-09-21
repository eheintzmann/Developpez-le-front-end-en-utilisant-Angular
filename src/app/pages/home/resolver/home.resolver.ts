import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DataService } from '../../../core/services/data/data.service';
import { HomeData } from '../model/home-data';

export const homeResolver: ResolveFn<HomeData> = () => {
  const dataService: DataService = inject(DataService);

  return forkJoin({
    pieChart: dataService.getPieChartData(),
    countryCount: dataService.getCountryCount(),
    jOCount: dataService.getJOCount()
  });
}
