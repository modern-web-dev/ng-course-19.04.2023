import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../../model/book';
import {catchError, Observable, throwError} from 'rxjs';
import {BookService} from '../../services/book.service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookDetailsResolver implements Resolve<Book> {
  constructor(private readonly books: BookService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.params['bookId'];
    const bookId = parseInt(bookIdAsString);
    if (isNaN(bookId)) {
      setTimeout(() => this.router.navigateByUrl('/books/new'));
      return throwError(() => new Error(`${bookIdAsString} could not be parsed`));
    }
    return this.books.findById(bookId).pipe(
      catchError(error => {
        setTimeout(() => this.router.navigateByUrl('/books/new'));
        return throwError(() => error);
      })
    );
  }
}
