import {Injectable} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {minLengthValidatorFactory} from "../../../../shared-module/forms/validators/min-length";
import {Book} from "../../../model/book";

type BookFormType = {
  title: FormControl<string>,
  author: FormGroup<{
    firstName: FormControl<string>,
    lastName: FormControl<string>
  }>,
  details: FormGroup<{
    pages: FormControl<number | null>
  }>
}

@Injectable({
  providedIn: 'root'
})
export class BookFormService {

  constructor(private readonly fb: NonNullableFormBuilder) {
  }

  prepareBookForm(): FormGroup<BookFormType> {

    const authorGroup = new FormGroup({
      firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    });
    const detailsGroup = new FormGroup({
      pages: new FormControl(0, {nonNullable: false, validators: [Validators.required]}),
    });
    return new FormGroup({
      title: new FormControl('test default value', {
        nonNullable: true,
        validators: [minLengthValidatorFactory(2), Validators.required]
      }),
      author: authorGroup,
      details: detailsGroup
    });
  }

  prepareBookForm1() {
    return this.fb.group<any>({
      title: ['test default value', [minLengthValidatorFactory(2), Validators.required]],
      author: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      }),
      details: this.fb.group({
        pages: ['0', [Validators.required]],
      }),
    });
  }
}
