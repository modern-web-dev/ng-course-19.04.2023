import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {
  catchError,
  debounceTime,
  distinct,
  distinctUntilChanged,
  flatMap,
  fromEvent,
  map,
  Observable, of,
  switchMap,
  tap, throwError
} from 'rxjs';
import {query} from '@angular/animations';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit {
  @ViewChild('search')
  searchInput: ElementRef | undefined;

  results$: Observable<string[]> | undefined;

  // books$: Observable<Book[]>;
  books: Book[] = [];
  selectedBook: Book | null = null;

  constructor(private readonly bookService: BookService) {
    bookService.observeBooks()
      .subscribe(
        books => {
          console.log('Just got my books:', books);
          this.books = books;
        }
      );
    console.log('End');
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book): void {
    this.selectedBook = updatedBook;
    this.books = this.books.map(book => book.id === updatedBook.id ? updatedBook : book);
  }

  ngAfterViewInit(): void {
    const searchInput = this.searchInput?.nativeElement as HTMLInputElement;

    this.results$ = fromEvent(searchInput, 'input')
      .pipe(
        map(event => {
          const inputElement = event.target as HTMLInputElement;
          return inputElement.value;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        tap(query => console.log('Searching for: ', query)),
        switchMap(query => this.bookService.search(query)),
        // catchError(error => {
        //   console.error(error);
        //   return of([]);
        //   // return throwError(() => new Error(error));
        // }),
        tap(results => console.log(results))
      );
  }
}
