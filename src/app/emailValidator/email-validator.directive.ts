import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validators, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[hinvEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if(value.includes('test')){
      return{
        invalidEmail: true,
      }
    }
    return null;
  }
}
