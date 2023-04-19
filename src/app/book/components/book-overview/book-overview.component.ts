import {Component} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | null = null;

  constructor() {
    this.books = [
      {
        id: 0,
        author: 'Douglas Crockford',
        title: 'JavaScript. The Good Parts'
      },
      {
        id: 1,
        author: 'J.R.R. Tolkien',
        title: 'Lord of the Rings'
      },
      {
        id: 2,
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

  updateBook(updatedBook: Book): void {
    this.selectedBook = updatedBook;
    this.books = this.books.map(book => book.id === updatedBook.id ? updatedBook : book);
  }
}
