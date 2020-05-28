import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { BackgroundImagePipe } from './background-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    BackgroundImagePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
