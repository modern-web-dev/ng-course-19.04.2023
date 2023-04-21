import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'ba-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {
  @HostBinding('class.invalid-feedback')
  isValidClass = true;

  @Input('of')
  control: any;
}
