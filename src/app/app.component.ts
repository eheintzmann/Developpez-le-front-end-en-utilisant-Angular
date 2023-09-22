import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'olympic-games-starter';
  public loading: boolean = false;
  private _subscription: Subscription = new Subscription();

  constructor(private _router: Router) {
  }


  ngOnInit(): void {
    this._subscription = this._router.events
      .pipe(
        tap({
            next: (event): void => {
              if (event instanceof NavigationStart) {
                this.loading = true;
              } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
              ) {
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

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
