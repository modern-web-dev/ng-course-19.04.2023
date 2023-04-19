import {Book} from '../model/book';

export class BookService {
  constructor() {
    console.log('BookService created');
  }

  findAll(): Book[] {
    return [
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
}
