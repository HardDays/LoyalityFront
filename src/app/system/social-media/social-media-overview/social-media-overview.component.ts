import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { SocialMediaService } from '../social-media.service';

@Component({
  selector: 'app-social-media-overview',
  templateUrl: './social-media-overview.component.html',
  styleUrls: []
})
export class SocialMediaOverviewComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private socialMediaService: SocialMediaService) { }

  ngOnInit() {

  }

  NavigateVk() {
    const { user_type } = this.auth.LoginData
    if (user_type === "creator") {
      this.router.navigate(['/system', 'social_media', 'vk']);
      return;
    }

    if (user_type === "client") {
      this.socialMediaService.AuthorizeVK()
    }
  }
}
