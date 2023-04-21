import {Route} from '@angular/router';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookDetailsResolver} from './components/book-details/book-details.resolver';
import {UnsavedDataGuard} from "../shared-module/guards/unsaved-data.guard";

export const bookRoutes: Route = {
  path: 'books',
  children: [
    {
      path: '',
      component: BookOverviewComponent
    },
    {
      path: 'new',
      component: BookDetailsComponent,
      canDeactivate: [UnsavedDataGuard]
    },
    {
      path: ':bookId',
      component: BookDetailsComponent,
      resolve: {
        book: BookDetailsResolver
      },
      canDeactivate: [UnsavedDataGuard]
    }
  ]
}
