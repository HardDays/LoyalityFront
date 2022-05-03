import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidatorService {
  public static ValidatePhone(Val) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (Val) {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        return regex.test(Val) ? null : { 'incorrect_value': { value: control.value } };
      }
      return null;
    };
  }

  public static MaskPhoneRU() {
    return ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
  }
  public static MaskPhoneRUwithout7() {
    return ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
  }
  public static MaskBirthDay() {
    return [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
  }

  public static StringNotEmpty(control: AbstractControl): ValidationErrors | null
  {
    if(control && control.value)
    {
      if(typeof control.value === "string")
      {
        return control.value.trim() ? null : {'empty': {value: control.value}};
      }
    }
    return null;
  }

}
