import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DataService } from '../../core/services/data/data.service';
import { PieChartElement } from '../../core/models/pie-chart-element';

type HomeData = {
  "pieChart": PieChartElement[],
  "countryCount": number,
  "jOCount": number
};

export const homeResolver: ResolveFn<HomeData> = (route, state) => {
  const dataService: DataService = inject(DataService);

  return forkJoin({
    "pieChart": dataService.getPieChartData(),
    "countryCount": dataService.getCountryCount(),
    "jOCount": dataService.getJOCount()
  });
}
