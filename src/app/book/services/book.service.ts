import {Book} from '../model/book';
import {Observable} from 'rxjs';

export class BookService {
  constructor() {
    console.log('BookService created');
  }

  search(query: string): Observable<string[]> {
    return new Observable<string[]>(subscriber => {
      setTimeout(() => {
        // subscriber.error('Ups...')
        subscriber.next([`${query}#1`, `${query}#2`, `${query}#3`]);
        subscriber.complete();
      }, 2000);
    });
  }

  observeBooks(): Observable<Book[]> {
    return new Observable<Book[]>(subscriber => {
        // setTimeout(() => {
          subscriber.next([
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
          subscriber.complete();
        // }, 2000);
    });

    // return new Promise<Book[]>(resolve => {
    //   setTimeout(() => {
    //     resolve([
    //       {
    //         id: 0,
    //         author: 'Douglas Crockford',
    //         title: 'JavaScript. The Good Parts'
    //       },
    //       {
    //         id: 1,
    //         author: 'J.R.R. Tolkien',
    //         title: 'Lord of the Rings'
    //       },
    //       {
    //         id: 2,
    //         author: 'Tom Hombergs',
    //         title: 'Get Your Hands Dirty On Clean Architecture'
    //       },
    //     ]);
    //   }, 2000);
    // });
  }
}
