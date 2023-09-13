import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent {

  data = {
    "countryName": null,
    "participationCount": null,
    "medalCount": null,
    "athleteCount": null,
    "lineChart": null,
  };

  constructor(private _dataService: DataService, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this._activatedRoute.data.subscribe(
      ({countryDetailData}) => {
        this.data = countryDetailData;
      })
  }

  axisFormat(val: number): string {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }
}
