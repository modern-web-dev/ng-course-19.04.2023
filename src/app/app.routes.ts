import {Routes} from '@angular/router';
import {bookRoutes} from './book/book.routes';
import {NotFoundComponent} from "./portal/not-found/not-found.component";

export const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/books'
  },
  bookRoutes,
  {
    path: '**',
    component: NotFoundComponent
  }
];
