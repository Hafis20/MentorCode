import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTable]'
})
export class SharedTableDirective implements OnChanges{

  @Input() index!:number;
  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['index']){
        this.updateTableHeader();
      }
  }

  private updateTableHeader(){
    if(this.index === 0){
      this.renderer.addClass(this.element.nativeElement,'text-start');
    }else{
      this.renderer.removeClass(this.element.nativeElement,'text-start');
    }
  }
}
