import {Routes} from '@angular/router';
import {bookRoutes} from './book/book.routes';

export const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/books'
  },
  bookRoutes,
];
