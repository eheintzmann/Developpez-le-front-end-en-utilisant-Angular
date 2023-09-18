import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { ErrorModule } from './error/error.module';
import { CachingModule } from './caching/caching.module';

@NgModule({
  declarations: [],
  imports: [
    ErrorModule,
    CachingModule,
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard{
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
