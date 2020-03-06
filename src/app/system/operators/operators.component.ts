import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'operators-cmp',
  templateUrl: './operators.component.html'
})
export class OperatorsComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private auth: AuthService) {

  }
  ngOnInit(): void {
  }
}
