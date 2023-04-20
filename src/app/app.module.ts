import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {PortalModule} from './portal/portal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BookModule.forRoot(),
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    PortalModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
