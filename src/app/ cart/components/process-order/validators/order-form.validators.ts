import {AbstractControl, ValidationErrors} from '@angular/forms';

export class OrderFormValidators {
  static userName(c: AbstractControl): ValidationErrors {
    const value: string = c.value;
    if (value && value[0].toUpperCase() !== value[0]) {
      return {userName: true};
    }
    return null;
  }
}
