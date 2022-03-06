import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    console.log("values:: "+controlName+"::"+matchingControlName)
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      console.log("values:: "+control.value+"::"+matchingControl.value)
      if (control.value !== matchingControl.value) {
          console.log("Password Does not Match!")
          matchingControl.setErrors({ pwdNotMatch: true });
      } else {;
        console.log("Password Matched!")
        matchingControl.setErrors(null);
      }
    };
  }

