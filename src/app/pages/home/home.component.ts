import { Component, OnInit } from '@angular/core';
import { map, Observable, of, zip } from 'rxjs';
import { Router } from '@angular/router';


import { DataService} from '../../core/services/data.service';
import { PieChartElement } from '../../core/models/pie-chart-element';
import { Nullable } from '../../core/types/Nullable';

type Obj = { [ key: string]: Nullable<PieChartElement[]> | Nullable<number> };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data$: Observable<Obj> = of<Obj>({});

  constructor(
      private _dataService: DataService,
      private _router: Router
  ) {}

  ngOnInit(): void {

    this.data$ = zip(
      this._dataService.getPieChartData(),
      this._dataService.getCountryCount(),
      this._dataService.getJOCount()
    ).pipe(
      map(([pie, countries, jOs]: Array<Nullable<PieChartElement[]> | Nullable<number>>): Obj => (
          {
            pieChart: pie,
            countriesCount: countries,
            jOsCount: jOs
          }
        )
      )
    )
  }
    onSelect($event: PieChartElement) {
      this._router.navigateByUrl(`/countries/${$event.extra.id}`);
    }
}
