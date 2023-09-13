import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BoxComponent } from './shared/components/box/box.component';
import { TitleBoxComponent } from './shared/components/title-box/title-box.component';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { CachingInterceptor } from './core/http-interceptors/caching.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    HomeComponent,
    NotFoundComponent,
    TitleBoxComponent,
    CountryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
