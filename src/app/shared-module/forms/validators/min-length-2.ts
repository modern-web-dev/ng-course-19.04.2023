import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const minLength2: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value.length < 2 ? {minLength2: true} : null;
}
