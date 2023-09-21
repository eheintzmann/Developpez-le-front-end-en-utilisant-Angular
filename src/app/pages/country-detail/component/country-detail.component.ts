import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from '../../../core/services/data/data.service';
import { CountryDetailData } from '../model/country-detail-data';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  public data!: CountryDetailData;
  private _subscription: Subscription = new Subscription();

  constructor(
    private _dataService: DataService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(
      ({countryDetailData}) => {
        this.data = countryDetailData;
      })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  axisFormat(val: number): string {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }
}
