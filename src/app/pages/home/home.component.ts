import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAward } from '@fortawesome/free-solid-svg-icons';

import { PieChartElement } from '../../core/models/pie-chart-element';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public readonly faAward = faAward;
  public data!: { "pieChart": PieChartElement[], "countryCount": number, "jOCount": number};
  private subscription = new Subscription();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this._activatedRoute.data.subscribe(
      ({homeData}) => {
        this.data = homeData;
      })
  }

  onSelect($event: PieChartElement): void {
    const countryId: number | null = $event?.extra?.id ?? null;
    if (countryId === null) {
      throw Error("Missing Country ID");
    }
    this._router.navigateByUrl(`/detail/${countryId}`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
