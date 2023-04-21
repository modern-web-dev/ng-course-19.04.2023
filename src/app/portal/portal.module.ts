import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {RouterModule} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [AppHeaderComponent]
})
export class PortalModule {
}
