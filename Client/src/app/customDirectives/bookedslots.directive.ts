import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[Bookedslots]'
})
export class BookedslotsDirective implements OnChanges{

  @Input() SlotStatus!:boolean;
  @Input() bookingStatus!:string;
  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnChanges(changes:SimpleChanges){
    if(changes['SlotStatus']){
      this.updateSlotLook();
    }
    if(changes['bookingStatus']){
      this.updateBookingStatusLook();
    }
  }

  private updateSlotLook(){
    if(this.SlotStatus){
      this.renderer.addClass(this.element.nativeElement,'bg-red-200');
    }else{
      this.renderer.removeClass(this.element.nativeElement,'bg-red-200')
    }
  }


  private updateBookingStatusLook(){
    if(this.bookingStatus === 'pending'){
      this.renderer.addClass(this.element.nativeElement,'bg-blue-500');
    }else if(this.bookingStatus === 'completed'){
      this.renderer.addClass(this.element.nativeElement,'bg-green-500');
    }else if(this.bookingStatus === 'cancelled'){
      this.renderer.addClass(this.element.nativeElement,'bg-red-500');
    }else if(this.bookingStatus === 'Mentor cancelled'){
      this.renderer.addClass(this.element.nativeElement,'bg-orange-400')
    }
  }

  
}
