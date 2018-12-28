import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

export class PasswordValidator {

	static MatchPassword(AC: AbstractControl) {
		let password = AC.get('password').value; // to get value in input tag
		let confirmPassword = AC.get('confirm_password').value; // to get value in input tag
		 if(password != confirmPassword) {
			 AC.get('confirm_password').setErrors( {MatchPassword: true} )
		 } else {
			 return null
		 }
	 }
	 
	public static areEqual(formGroup: FormGroup) {
		let val;
		let valid = true;

		for (let key in formGroup.controls) {
			if (formGroup.controls.hasOwnProperty(key)) {
				let control: FormControl = <FormControl>formGroup.controls[key];
				if (val === undefined) {
					val = control.value
				} else {
					if (val !== control.value) {
						valid = false;
						break;
					}
				}
			}
		}
		if (valid) {
			return null;
		}
		return {
			areEqual: true
		}
	}
}