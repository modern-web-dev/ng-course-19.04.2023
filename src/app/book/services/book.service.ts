import {Book} from '../model/book';
import {Observable} from 'rxjs';

export class BookService {
  constructor() {
    console.log('BookService created');
  }

  observeBooks(): Observable<Book[]> {
    return new Observable<Book[]>(subscriber => {
        setTimeout(() => {
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
        }, 2000);
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
