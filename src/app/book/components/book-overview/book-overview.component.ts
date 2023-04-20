import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnDestroy {
  books$: Observable<Book[]>;
  selectedBook: Book | null = null;
  private unsubscribe$ = new Subject<void>()

  constructor(private readonly books: BookService) {
    this.books$ = books.values$;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book): void {
    this.books.updateBook(updatedBook)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(newBook => this.selectedBook = newBook);
  }
}
