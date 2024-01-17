import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changetopositive'
})
export class ChangetopositivePipe implements PipeTransform {

  transform(value: number): string {
    if(value >= 0){
      return `₹ ${value}`;
    }else{
      return `-₹ ${Math.abs(value)}`;
    }
  }
}
