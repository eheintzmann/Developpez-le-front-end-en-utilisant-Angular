import { Component, OnInit } from '@angular/core';
import { delay, take} from 'rxjs';

import { OlympicService } from './core/services/olympic.service';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'olympic-games-starter';
  public loading: boolean = true;

  constructor(private _olympicService: OlympicService, private _loading: LoadingService) {}

  ngOnInit(): void {
    this.listenToLoading();
    this._olympicService.loadInitialData().pipe(delay(3000),take(1)).subscribe();
  }

  listenToLoading(): void {
    this._loading.isLoading$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading:boolean):void => {
        this.loading = loading;
      });
  }
}
