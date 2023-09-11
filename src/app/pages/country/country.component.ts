import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Nullable } from '../../core/types/Nullable';
import { DataService } from '../../core/services/data.service';
import { LineChartElement } from '../../core/models/line-chart-element';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent {

  countryName: Nullable<string>;
  participationCount: Nullable<number>;
  medalCount: Nullable<number>;
  athleteCount: Nullable<number>;
  lineChart: Nullable<LineChartElement[]>;

  constructor(private _dataService: DataService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {

    const id: number = Number(this._route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id)) {
      throw Error(`Error 400 - Bad Request - Invalid country id : ${this._route.snapshot.paramMap.get('id')}`);
    }

    this._dataService.getCountryName(id).subscribe(
      (val: Nullable<string>) => {
        this.countryName = val
      }
    );
    this._dataService.getParticipationCountByCountryId(id).subscribe(
      (val: Nullable<number>) => {
        this.participationCount = val
      }
    );
    this._dataService.getMedalCountByCountryId(id).subscribe(
      (val: Nullable<number>) => {
        this.medalCount = val
      }
    );
    this._dataService.getAthleteCountByCountryId(id).subscribe(
      (val: Nullable<number>) => {
        this.athleteCount = val
      }
    );

    this._dataService.getLineChartData(id).subscribe(
      (val: LineChartElement[] ): void => {
        this.lineChart = val;
      }
    );
  }
  axisFormat(val: number): string {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }
}
