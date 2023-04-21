import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ValidationMessageComponent} from './forms/validation-message/validation-message.component';
import {CardComponent} from './card/card.component';


const reexportedComponenets = [ValidationMessageComponent, CardComponent];
const reexportedModules = [CommonModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule];

@NgModule({
  declarations: [
    ...reexportedComponenets,

  ],
  imports: [
    ...reexportedModules
  ],
  exports: [
    ...reexportedModules,
    ...reexportedComponenets
  ]
})
export class SharedModule {
}
