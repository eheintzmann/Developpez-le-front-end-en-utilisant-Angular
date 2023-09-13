import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAward } from '@fortawesome/free-solid-svg-icons';

import { PieChartElement } from '../../core/models/pie-chart-element';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly faAward = faAward;
  data = {
    "pieChart": null,
    "countryCount": null,
    "jOCount": null
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {

    this._activatedRoute.data.subscribe(
      ({homeData}) => {
        this.data = homeData;
      })
  }

  onSelect($event: PieChartElement): void {
    this._router.navigateByUrl(`/detail/${$event.extra.id}`);
  }

}
