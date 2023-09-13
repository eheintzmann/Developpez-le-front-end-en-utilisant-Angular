import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { Subscription, tap } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'olympic-games-starter';
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private _router: Router
  ) {
    this.subscription = this._router.events
      .pipe(
        tap({
            next: (event): void => {
              if (event instanceof NavigationStart) {
                this.loading = true;
              } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.loading = false;
              }
            },
            error: (): void => {
              this.loading = false
            }
          }
        )
      ).subscribe();
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
