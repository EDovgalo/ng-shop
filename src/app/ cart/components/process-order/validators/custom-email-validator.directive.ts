import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomEmailValidatorDirective,
      multi: true
    }
  ]
})
export class CustomEmailValidatorDirective implements Validator {

  private regex = '\.(com|ru|by)$';

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value.match(this.regex)) {
      return {CustomEmailValidator: true};
    }
    return null;
  }

}
