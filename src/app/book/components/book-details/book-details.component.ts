import {Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnDestroy {
  book: Book | null = null;

  private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly books: BookService,
              private readonly router: Router,
              private readonly currentRoute: ActivatedRoute) {
    this.book = currentRoute.snapshot.data['book'] ?? null;
  }

  saveAndGoToOverview(event: Event): void {
    event.preventDefault();
    const bookForm = event.target as HTMLFormElement;
    const authorInput = bookForm.querySelector<HTMLInputElement>('#author');
    const titleInput = bookForm.querySelector<HTMLInputElement>('#title');
    const author = authorInput?.value || '';
    const title = titleInput?.value || '';

    const saveOrUpdate = this.book ?
      this.books.updateBook({id: this.book?.id!, author, title})
      : this.books.saveBook({author, title});
    saveOrUpdate
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.router.navigate(['..'], {relativeTo: this.currentRoute});
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
