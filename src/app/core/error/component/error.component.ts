import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ErrorClass } from '../enum/error-class';

@Component({
  selector: 'app-server-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorTitle: string = '';
  subscription: Subscription = new Subscription();

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this._route.data.pipe(
      tap(
        ({error}) => this.errorTitle = this.setErrorMessage(error))
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private setErrorMessage(error: ParamMap): string {

    if (!error.has('class') ) {
      return 'No corresponding page found';
    }
    if (error.get('class') === ErrorClass.Server.toString()) {
      if (error.get('status') === '400') {
        return 'Bad request';
      }
      return 'Server error';
    }
    if (error.get('class') === ErrorClass.Client.toString()) {
      return 'Erreur client';
    }
    return  'Unknown error';
  }

}
