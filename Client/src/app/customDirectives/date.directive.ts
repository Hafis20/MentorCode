import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective implements OnChanges{

  @Input() date!:number;
  @Input() month!:number;
  @Input() year!:number;
  @Input() createdSlotDates!:string[];

  constructor(private element:ElementRef, private renderer:Renderer2) {
      // this.updateCalender();
  }


  ngOnChanges(changes:SimpleChanges):void{
    if(changes['date'] || changes['month'] || changes['year'] || changes['createdSlotDates']){
      this.updateCalender();
    }
  }

  private updateCalender(){
    const selectedDate = new Date(this.year,this.month,this.date);


    if(this.createdSlotDates){
      const dateMatch = this.createdSlotDates.some(date=>this.compareDates(new Date(date),selectedDate));
      
      if(dateMatch){
        this.renderer.addClass(this.element.nativeElement,'bg-green-500');
      }else{
        this.renderer.removeClass(this.element.nativeElement,'bg-green-500');
      }
    }
  }

  // For comparing the dates
  private compareDates(date1: Date, date2: Date): boolean {
    // console.log(date1);
    console.log(date1.toDateString())
    console.log(date2.toDateString())
    return date1.toDateString() === date2.toDateString()
  }
}
