import { Directive, HostListener, OnInit, Output, EventEmitter, ElementRef, NgModule } from '@angular/core';

@Directive({
  selector: '[clickDirective]'
})
export class ClickDirective implements OnInit {

  @Output() clickOutside = new EventEmitter<boolean>();
  @Output() clickInside = new EventEmitter<boolean>();
  constructor(private _elementRef: ElementRef) {

  }
  ngOnInit() {
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(true);
    }
    else {
      this.clickInside.emit(true);
    }
  }

}

@NgModule({
  declarations: [
    ClickDirective
  ],
  imports: [

  ],
  exports: [
    ClickDirective
  ],
  providers: []
})
export class ClickDirectiveModule { }
