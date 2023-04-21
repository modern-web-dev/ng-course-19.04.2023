import {FormControl, FormGroup} from "@angular/forms";

export type ControlsOfType<T> = {
  [K in keyof T]: T[K] extends string | number | undefined ?
    FormControl<T[K]> : FormGroup<ControlsOfType<T[K]>>
}
