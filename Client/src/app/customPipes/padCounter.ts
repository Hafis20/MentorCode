import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
   name:'padCounter',
})
export class PadCounterPipe implements PipeTransform{
   transform(value:number) {
      return value.toString().padStart(2,'0')
   }
}