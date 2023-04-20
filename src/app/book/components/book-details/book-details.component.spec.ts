import {BookDetailsComponent} from './book-details.component';
import {Book} from '../../model/book';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('BookDetailsComponent', function () {
  const testBookId = 1;
  const testAuthor = 'Test Author';
  const updatedAuthor = 'Updated Author';
  const updatedTitle = 'Updated Title';
  let testBook: Book;

  beforeEach(function () {
    testBook = {id: testBookId, author: testAuthor, title: 'Test Title'};
  })

  describe('(class tests)', function () {
    it('notifies on book changes', function () {
      // 1. given
      const component = new BookDetailsComponent();
      component.book = testBook;
      const formWithUpdatedValues = {
        querySelector(selector: string) {
          const value = selector === '#author' ? updatedAuthor : updatedTitle;
          return {value};
        }
      }
      const eventMock: any = {
        preventDefault: jasmine.createSpy(),
        target: formWithUpdatedValues
      };
      component.bookChange.subscribe(changedBook => {
        // 3. then
        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect(changedBook).toBeDefined();
        expect(changedBook.id).toBe(testBookId);
        expect(changedBook.author).toBe(updatedAuthor);
        expect(changedBook.title).toBe(updatedTitle);
      })
      // 2. when
      component.saveAndGoToOverview(eventMock)
    });
  });

  describe('(DOM tests)', function () {
    let fixture: ComponentFixture<BookDetailsComponent>;
    let component: BookDetailsComponent;
    let element: HTMLElement;

    beforeEach(function () {
      TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      });

      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement as HTMLElement;
    });

    it('puts input values in form', function () {
      // given
      component.book = testBook;
      // when
      fixture.detectChanges();
      // then
      const authorInput = element.querySelector<HTMLInputElement>('#author');
      expect(authorInput).not.toBeNull();
      expect(authorInput?.value).toBe(testAuthor);
    });

    it('notifies on book changes when save button clicked', function () {
      // 1. given
      component.book = testBook;
      fixture.detectChanges();
      component.bookChange.subscribe(updatedBook => {
        // 3. then
        expect(updatedBook.author).toBe(updatedAuthor);
      });
      // 2. when
      const bookForm = bookFormOf(element);
      bookForm.setAuthorInputValue(updatedAuthor);
      bookForm.clickSave();
    });
  });
});

export function bookFormOf(element: HTMLElement) {
  return {
    getAuthorInputValue(): string {
      return getAuthorInput().value;
    },

    setAuthorInputValue(newValue: string): void {
      getAuthorInput().value = newValue;
    },

    getTitleInputValue(): string {
      return getTitleInput().value;
    },

    setTitleInputValue(newValue: string): void {
      getTitleInput().value = newValue;
    },

    clickSave(): void {
      const saveButton = element.querySelector<HTMLInputElement>('button');
      if (!saveButton) {
        throw new Error('Save button not found');
      }
      saveButton.click();
    }
  };

  function getAuthorInput(): HTMLInputElement {
    const authorInput = element.querySelector<HTMLInputElement>('#author');
    if (!authorInput) {
      throw new Error('Author input not found')
    }
    return authorInput;
  }

  function getTitleInput(): HTMLInputElement {
    const titleInput = element.querySelector<HTMLInputElement>('#title');
    if (!titleInput) {
      throw new Error('Title input not found')
    }
    return titleInput;
  }
}
