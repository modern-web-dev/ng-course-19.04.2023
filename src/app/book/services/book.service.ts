import {Book, BookProperties} from '../model/book';
import {BehaviorSubject, Observable} from 'rxjs';

export class BookService {
  private idSeq = 0;
  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The Good Parts'
    },
    {
      id: this.idSeq++,
      author: 'J.R.R. Tolkien',
      title: 'Lord of the Rings'
    },
    {
      id: this.idSeq++,
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

  saveBook(bookProperties: BookProperties): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const newBook: Book = {...bookProperties, id: this.idSeq++};
      subscriber.next(newBook);
      subscriber.complete();
      const currentBooks = this.booksSubject.getValue();
      this.booksSubject.next([...currentBooks, newBook]);
    });
  }

  findById(bookId: number): Observable<Book> {
    return new Observable(subscriber => {
      const currentBooks = this.booksSubject.getValue();
      const foundBook = currentBooks.find(book => book.id === bookId);
      if (foundBook) {
        subscriber.next({...foundBook});
        subscriber.complete();
      } else {
        subscriber.error(`Book with ID ${bookId} not found`);
      }
    });
  }
}
