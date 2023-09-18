import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BoxComponent } from './shared/components/box/box.component';
import { TitleBoxComponent } from './shared/components/title-box/title-box.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    BoxComponent,
    HomeComponent,
    TitleBoxComponent,
    CountryDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CoreModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
