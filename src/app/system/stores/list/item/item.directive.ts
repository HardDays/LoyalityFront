import { Directive, HostListener, Input, HostBinding, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { StoreModel } from '../../../../core/models/store.model';
import { StoresService } from '../../stores.service';
import { OperatorModel } from 'src/app/core/models/operator.model';

@Directive({
  selector: '[StoreItem]'
})
export class StoreItemDirective implements OnInit {

  @Input() Item: StoreModel;
  @Output() clickOutside = new EventEmitter<StoreModel>();
  Operators: OperatorModel[] = [];
  constructor(private _elementRef: ElementRef) {

  }
  ngOnInit() {
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(this.Item);
    }
  }

}
