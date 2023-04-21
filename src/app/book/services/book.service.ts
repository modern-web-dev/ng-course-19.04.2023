import {Book, BookProperties} from '../model/book';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class BookService {
  constructor(private readonly httpClient: HttpClient) {
  }

  updateBook(bookToUpdate: Book): Observable<Book> {
    return this.httpClient.put<Book>(`http://localhost:3000/books/${bookToUpdate.id}`, bookToUpdate);
  }

  saveBook(bookProperties: BookProperties): Observable<Book> {
    return this.httpClient.post<Book>(`http://localhost:3000/books`, bookProperties);
  }

  findByTitle(title_like: string): Observable<Book[]> {
    const params = new HttpParams({fromObject: {title_like}});
    return this.httpClient.get<Book[]>(`http://localhost:3000/books`, {params});
  }

  findById(bookId: number): Observable<Book> {
    //`Book with ID ${bookId} not found`
    return this.httpClient.get<Book>(`http://localhost:3000/books/${bookId}`);
  }

  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>("http://localhost:3000/books");
  }
}
