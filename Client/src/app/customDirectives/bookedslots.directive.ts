import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[Bookedslots]'
})
export class BookedslotsDirective implements OnChanges{

  @Input() SlotStatus!:boolean;
  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnChanges(changes:SimpleChanges){
    if(changes['SlotStatus']){
      this.updateSlotLook();
    }
  }

  private updateSlotLook(){
    if(this.SlotStatus){
      this.renderer.addClass(this.element.nativeElement,'bg-red-200');
    }else{
      this.renderer.removeClass(this.element.nativeElement,'bg-red-200')
    }
  }
}
