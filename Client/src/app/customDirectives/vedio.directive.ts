import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appVedio]'
})
export class VedioDirective implements OnChanges{

  @Input() currentDate!:string;

  constructor(private element:ElementRef, private renderer:Renderer2) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentDate']){
      this.disableIcon();
    }
  }

  
  // Disabled the icon the date is not same
  disableIcon(){
    const today:string = new Date().toDateString();
    if(this.currentDate !== today){
      this.renderer.addClass(this.element.nativeElement,'opacity-30');
      this.renderer.addClass(this.element.nativeElement,'pointer-events-none');
    }else{
      this.renderer.removeClass(this.element.nativeElement,'opacity-30');
      this.renderer.removeClass(this.element.nativeElement,'pointer-events-none');
    }
  }

}
