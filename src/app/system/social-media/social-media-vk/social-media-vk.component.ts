import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-media-vk',
  templateUrl: './social-media-vk.component.html',
  styleUrls: []
})
export class SocialMediaVkComponent implements OnInit {

  constructor(private _location: Location, private router: Router) {
  }

  ngOnInit() {
  }

  GoBack() {
    this._location.back();
  }
}
