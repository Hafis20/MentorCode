import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTable]'
})
export class SharedTableDirective implements OnChanges{

  @Input() index!:number;
  @Input() status!:string;
  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['index']){
        this.updateTableHeader();
      }

      if(changes['status']){
        this.updateCancelButton();
      }
  }

  private updateTableHeader():void{
    if(this.index === 0){
      this.renderer.addClass(this.element.nativeElement,'text-start');
    }else{
      this.renderer.removeClass(this.element.nativeElement,'text-start');
    }
  }


  private updateCancelButton():void{
    if(this.status === 'completed' || this.status === 'Mentor cancelled' || this.status === 'cancelled'){
      this.renderer.addClass(this.element.nativeElement,'pointer-events-none');
      this.renderer.addClass(this.element.nativeElement,'opacity-30')
    }else{
      this.renderer.removeClass(this.element.nativeElement,'pointer-events-none');
      this.renderer.removeClass(this.element.nativeElement,'opacity-30')     
    }
  }
}
