import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  OperatorFunction,
  switchMap
} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit {
  @ViewChild('search')
  searchInput: ElementRef | undefined;

  books$?: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly currentRoute: ActivatedRoute) {
  }

  goToDetailsOf(book: Book): void {
    this.router.navigate([book.id], {relativeTo: this.currentRoute});
  }

  ngAfterViewInit(): void {
    const searchInput = this.searchInput?.nativeElement as HTMLInputElement;

    const typeaheadBooks$ = fromEvent(searchInput, 'input')
      .pipe(
        fromEventToTargetValue(),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(query => this.books.findByTitle(query)),
        catchError(error => {
          console.error(error);
          return of([]);
        }),
      );
    const booksFromServer$ = this.books.findAll();
    this.books$ = merge(booksFromServer$, typeaheadBooks$);
  }
}

function fromEventToTargetValue(): OperatorFunction<Event, string> {
  return map(event => {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.value;
  })
}
