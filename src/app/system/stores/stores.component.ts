import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'stores-cmp',
  templateUrl: './stores.component.html'
})
export class StoresComponent  implements OnInit{
  constructor(private cdr: ChangeDetectorRef, private auth: AuthService) {
        console.log('stores');
  }
  ngOnInit(): void 
  {
  }
}
