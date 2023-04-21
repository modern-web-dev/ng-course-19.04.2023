import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {minLengthValidatorFactory} from "../../../../shared-module/forms/validators/min-length";

@Injectable({
  providedIn: 'root'
})
export class BookFormService {

  constructor(private readonly fb: NonNullableFormBuilder) {
  }

  prepareBookForm() {
    return new FormGroup<any>({
      title: new FormControl('test default value', {
        nonNullable: true,
        validators: [minLengthValidatorFactory(2), Validators.required]
      }),
      author: new FormGroup({
        firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
        lastName: new FormControl('', [Validators.required]),
      }),
      details: new FormGroup({
        pages: new FormControl('', [Validators.required]),
      }),
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
