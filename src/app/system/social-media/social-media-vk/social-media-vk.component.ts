import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SocialMediaService } from "../social-media.service"

@Component({
  selector: 'app-social-media-vk',
  templateUrl: './social-media-vk.component.html',
  styleUrls: []
})
export class SocialMediaVkComponent implements OnInit {

  constructor(private _location: Location, private router: Router, private socialMedialService: SocialMediaService) {
  }

  ngOnInit() {
  }

  GoBack() {
    this._location.back();
  }

  CopyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.innerText = 'https://vk.com/f639grp';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
