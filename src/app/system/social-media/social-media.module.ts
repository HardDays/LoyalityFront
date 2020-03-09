import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SocialMediaRoutingModule } from './social-media.routing';
import { SocialMediaVkComponent } from './social-media-vk/social-media-vk.component';
import { SocialMediaTelegramComponent } from './social-media-telegram/social-media-telegram.component';
import { SocialMediaOverviewComponent } from './social-media-overview/social-media-overview.component';
import { SocialMediaAccessGuard } from './social-media.guard';
import { SocialMediaComponent } from './social-media.component';
import { SocialMediaService } from './social-media.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SocialMediaComponent, SocialMediaVkComponent, SocialMediaTelegramComponent, SocialMediaOverviewComponent],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SocialMediaService, SocialMediaAccessGuard],
})
export class SocialMediaModule { }
