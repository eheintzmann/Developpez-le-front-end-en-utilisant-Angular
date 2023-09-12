import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BoxComponent } from './shared/components/box/box.component';
import { TitleBoxComponent } from './shared/components/title-box/title-box.component';
import { HttpLoadingInterceptor } from './core/errors/http-loading.interceptor';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
