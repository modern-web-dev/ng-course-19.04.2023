import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books: Book[];
  selectedBook: Book | null = null;

  constructor() {
    this.books = [
      {
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      },
      {
        author: 'J.R.R. Tolkien',
        title: 'Lord of the Rings'
      },
      {
        author: 'Tom Hombergs',
        title: 'Get Your Hands Dirty On Clean Architecture'
      },
    ];
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }
}
