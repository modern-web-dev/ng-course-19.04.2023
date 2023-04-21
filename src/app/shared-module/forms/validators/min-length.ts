import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const minLengthValidatorFactory = (minLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.length < minLength ? {minLength: true} : null;
  }
}
