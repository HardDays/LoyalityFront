import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media.routing';
import { SocialMediaVkComponent } from './social-media-vk/social-media-vk.component';
import { SocialMediaTelegramComponent } from './social-media-telegram/social-media-telegram.component';
import { SocialMediaOverviewComponent } from './social-media-overview/social-media-overview.component';
import { SocialMediaAccessGuard } from './social-media.guard';

@NgModule({
  declarations: [SocialMediaVkComponent, SocialMediaTelegramComponent, SocialMediaOverviewComponent],
  imports: [
    CommonModule,
    SocialMediaRoutingModule
  ],
  providers: [SocialMediaAccessGuard],
})
export class SocialMediaModule { }
