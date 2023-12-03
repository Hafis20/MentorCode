import { AbstractControl, ValidationErrors } from "@angular/forms";

// Name validation custom function
export function nameValidation(control:AbstractControl):ValidationErrors |null{
   if(control.value.trim() === ''){
      return {nameError:true}
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


