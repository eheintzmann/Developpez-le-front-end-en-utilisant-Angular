import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription, tap } from "rxjs";

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit, OnDestroy {
  serverError: { [key: string]: string | number | null } = {};
  subscription: Subscription = new Subscription();

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this._route.data.pipe(
      tap(
      ({serverError}) => {
        this.serverError = serverError;
      })
    ).subscribe()
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

}
