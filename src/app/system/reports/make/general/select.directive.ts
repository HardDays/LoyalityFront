import {Directive, HostListener, Input, HostBinding, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import { StoreModel } from '../../../../core/models/store.model';
import { OperatorModel } from 'src/app/core/models/operator.model';
 
@Directive({
    selector: '[SelectDir]'
})
export class SelectDirective implements OnInit{
     
    @Input() SelectName = "";
    @Output() clickOutside = new EventEmitter<String>();
    Operators: OperatorModel[] = [];
    constructor(private _elementRef : ElementRef){

    }
    ngOnInit(){
    }
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(this.SelectName);
        }
    }
     
}