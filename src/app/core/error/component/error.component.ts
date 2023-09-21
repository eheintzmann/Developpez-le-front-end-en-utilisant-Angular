import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomError } from '../model/custom-error';

@Component({
  selector: 'app-server-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  public customError?: CustomError
  private subscription!: Subscription;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this._route.data.subscribe( ({customError}) => {
      this.customError = customError });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
