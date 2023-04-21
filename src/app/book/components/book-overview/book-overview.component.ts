import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  of,
  OperatorFunction,
  switchMap
} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {

  typeaheadFormControl = new FormControl();

  books$?: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly currentRoute: ActivatedRoute) {
  }

  resetForm() {
    this.typeaheadFormControl.reset();
  }

  ngOnInit(): void {
    const typeaheadBooks$ = this.typeaheadFormControl.valueChanges
      .pipe(
        filter((controlValue) => !controlValue || controlValue?.length > 2),
        map((controlValue) => controlValue || ''),
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

  goToDetailsOf(book: Book): void {
    this.router.navigate([book.id], {relativeTo: this.currentRoute});
  }

}

function fromEventToTargetValue(): OperatorFunction<Event, string> {
  return map(event => {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.value;
  })
}
