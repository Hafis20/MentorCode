import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate',
})
export class ToDatePipe implements PipeTransform {
  transform(date: Date): string {
    console.log(date);
    const originalDate = new Date(date);
    return originalDate.toLocaleDateString();
  }
}
