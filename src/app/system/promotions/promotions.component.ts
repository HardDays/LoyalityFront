import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'promotions-cmp',
  templateUrl: './promotions.component.html'
})
export class PromotionsComponent  implements OnInit{
  constructor(private cdr: ChangeDetectorRef, private auth: AuthService) {
       
  }
  ngOnInit(): void 
  {
  }
}
