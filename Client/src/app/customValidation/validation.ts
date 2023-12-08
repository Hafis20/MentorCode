import { AbstractControl, ValidationErrors } from "@angular/forms";

// Name validation custom function
export function spaceValidation(control:AbstractControl):ValidationErrors |null{
   if(control.value.trim() === ''){
      return {spaceError:true}
   }
   return null;
}

// Negative value custom validation
export function negativeValidation(control:AbstractControl):ValidationErrors|null{
   if(control.value < 1){
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

