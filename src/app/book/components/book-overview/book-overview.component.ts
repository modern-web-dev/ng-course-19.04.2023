import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | null = null;

  constructor(bookService: BookService) {
    this.books = bookService.findAll();
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
