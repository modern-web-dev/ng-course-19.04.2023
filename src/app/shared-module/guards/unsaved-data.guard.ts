import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {UnsavedDataInterface} from "./unsaved-data-interface";

@Injectable({
  providedIn: 'root'
})
export class UnsavedDataGuard implements CanDeactivate<UnsavedDataInterface> {
  canDeactivate(component: UnsavedDataInterface): boolean {
    if (component.hasUnsavedChanges()) {
      return confirm("Unsaved changes!")
    }
    return true;
  }

}
