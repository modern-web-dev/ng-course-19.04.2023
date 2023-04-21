import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookService} from './services/book.service';
import {BookDetailsResolver} from './components/book-details/book-details.resolver';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared-module/shared.module";

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookOverviewComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [BookOverviewComponent]
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService, BookDetailsResolver]
    }
  }
}
