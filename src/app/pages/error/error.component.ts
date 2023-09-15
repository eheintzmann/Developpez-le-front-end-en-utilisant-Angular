import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy{
  clientError: { [key: string]: string | number | null } = {};
  subscription: Subscription = new Subscription();

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this._route.data.pipe(
      tap(
        ({clientError}) => {
          this.clientError = clientError;
        })
    ).subscribe()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected readonly name = name;
}
