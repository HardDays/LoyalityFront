import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-client-preloader',
  templateUrl: './client-preloader.component.html',
  styleUrls: ['./client-preloader.component.scss']
})
export class ClientPreloaderComponent implements OnInit {

  @Input() IsLoading = false;
  constructor() { }

  ngOnInit() {
  }

}
