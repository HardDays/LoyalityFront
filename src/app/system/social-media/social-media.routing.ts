import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialMediaTelegramComponent } from './social-media-telegram/social-media-telegram.component';
import { SocialMediaVkComponent } from './social-media-vk/social-media-vk.component';
import { SocialMediaAccessGuard } from './social-media.guard';
import { SocialMediaOverviewComponent } from './social-media-overview/social-media-overview.component';


const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: SocialMediaOverviewComponent, canActivate: [SocialMediaAccessGuard] },
  { path: 'vk', component: SocialMediaVkComponent, canActivate: [SocialMediaAccessGuard] },
  { path: 'telegram', component: SocialMediaTelegramComponent, canActivate: [SocialMediaAccessGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})

export class SocialMediaRoutingModule { }
