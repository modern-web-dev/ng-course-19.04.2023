import {Book} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
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
  ]);

  readonly values$ = this.booksSubject.asObservable();

  updateBook(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const bookCopy = {...bookToUpdate};
      let currentBooks = this.booksSubject.getValue();
      currentBooks = currentBooks.map(book => book.id === bookToUpdate.id ? bookCopy : book);
      this.booksSubject.next(currentBooks);
      subscriber.next(bookCopy);
      subscriber.complete();
    });
  }
}
