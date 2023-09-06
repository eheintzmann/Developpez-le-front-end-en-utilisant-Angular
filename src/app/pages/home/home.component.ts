import { Component, OnInit } from '@angular/core';
import { map, Observable, of, zip } from 'rxjs';

import { DataService} from '../../core/services/data.service';
import {PieChartElement} from "../../core/models/PieChartElement";
import {Nullable} from "../../core/types/Nullable";
type Obj = { [ key: string]: Nullable<PieChartElement[]> | Nullable<number> };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data$: Observable<Obj> = of<Obj>({});

  constructor(private dataService: DataService) {}

  ngOnInit(): void {

    this.data$ = zip(
      this.dataService.getPieChartData(),
      this.dataService.getCountriesCount(),
      this.dataService.getJOsCount()
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
}
