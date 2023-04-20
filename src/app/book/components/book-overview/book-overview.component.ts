import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly currentRoute: ActivatedRoute) {
    this.books$ = books.values$;
  }

  goToDetailsOf(book: Book): void {
    this.router.navigate([book.id], {relativeTo: this.currentRoute});
  }

  // updateBook(updatedBook: Book): void {
  //   this.books.updateBook(updatedBook)
  //     .pipe(
  //       takeUntil(this.unsubscribe$)
  //     )
  //     .subscribe(newBook => this.selectedBook = newBook);
  // }
}
