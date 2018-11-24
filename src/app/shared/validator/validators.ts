import { AbstractControl } from '@angular/forms';

export function passwordMatcher(c: AbstractControl): { invalid: boolean } {
  const password = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (confirmPassword.value && confirmPassword.value.length > 0) {
    if (password.value !== confirmPassword.value) {
      return { invalid: true };
    }
  } else {
    return { invalid: false };
  }
}
