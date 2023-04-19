import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input()
  book: Book | null = null;
}
