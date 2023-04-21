import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {FormGroup} from "@angular/forms";
import {BookFormService} from "./services/book-form.service";


@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {

  bookForm: FormGroup<any> = this.bookFormService.prepareBookForm();
  book: Book | null = null;

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly currentRoute: ActivatedRoute,
              private readonly bookFormService: BookFormService) {
    currentRoute.data.subscribe((data) => {
      this.book = data['book'] ?? null
      this.bookForm.reset(this.book);

      // this.bookForm.reset({title:"test"}); // reset wartosci + czyszczenie stanu
      // this.bookForm.setValue({title:"test", author:{firstName:'Tomasz',lastName:'Waw'}, details:{pages:1}}); // ustawianie wartosci
      // this.bookForm.patchValue({title:"test"}); // ustawianie wartosci czesciowo
    });
    // currentRoute.data <-- te z resolvera
    // currentRoute.queryParams <-- te z adresu url
    // currentRoute.params <-- te z routera
  }

  saveAndGoToOverview(event: Event): void {
    // event.preventDefault();

    const changedBook = this.bookForm.value;

    const saveOrUpdate = this.book ?
      this.books.updateBook({id: this.book?.id!, ...changedBook})
      : this.books.saveBook(changedBook);
    saveOrUpdate
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        // this.router.navigate(['..'], {relativeTo: this.currentRoute});
      })
  }

  resetForm() {
    this.bookForm.reset();
  }

  disableAuthor() {
    const authorFormGroup = this.bookForm.controls['author'] as FormGroup;
    authorFormGroup?.controls['firstName']?.disable();
  }

  enableAuthor() {
    this.bookForm.get('author.firstName')?.enable();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
