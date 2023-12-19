import { AbstractControl, ValidationErrors } from "@angular/forms";

// Name validation custom function
export function spaceValidation(control:AbstractControl):ValidationErrors |null{
   if(typeof control.value === 'string' && control.value.trim() === ''){
      return {spaceError:true}
   }
   return null;
}

// Negative value custom validation
export function negativeValidation(control:AbstractControl):ValidationErrors|null{
   if(control.value && control.value < 1){
      return {negativeError:true}
   }
   return null;
}

// For password pattern checking
export function passwordValidation(control:AbstractControl):ValidationErrors | null{
   // Validation pattern
   const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
   if(!pattern.test(control.value)){
      return { passwordPatternError : true}
   }
   return null;
}

// Mobile number validation
export function mobileNumberValidation(control:AbstractControl):ValidationErrors | null{
  const pattern =  /^[0-9]{10}$/;
  if(!pattern.test(control.value)){
   return {mobileNumberError:true}
  }
  return null;
}