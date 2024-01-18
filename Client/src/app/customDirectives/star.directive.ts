import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStar]'
})
export class StarDirective {
  
  constructor(private el:ElementRef,private renderer:Renderer2) { 
    this.buttonDisable();
  }

  buttonDisable(){
    this.renderer.addClass(this.el.nativeElement,'pointer-events-none');
  }

}
