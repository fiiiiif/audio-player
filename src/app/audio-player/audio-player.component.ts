import { Component, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { map, takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnDestroy {

  @Input() playing: boolean;
  @Input() cover: string;
  @Input() set src(src: string) {
    this.load(src);
  }

  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();

  trackScale$: Observable<string>;

  private audio: HTMLAudioElement;
  private complete$ = new Subject<void>();

  constructor() {
    this.audio = new Audio();
    this.trackScale$ = this.getTrackScale();
  }

  toggle() {
    if (this.playing) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.playing = !this.playing;
  }

  ngOnDestroy() {
    this.complete$.next();
    this.complete$.complete();

    this.audio.pause();
    this.audio.removeAttribute('src');
    this.audio.load();
  }

  private load(src: string) {
    this.audio.pause();
    this.audio.src = src;
    this.audio.load();
  }

  private getTrackScale() {
    return fromEvent(this.audio, 'timeupdate')
      .pipe(
        map(() => this.audio.currentTime / this.audio.duration),
        startWith(0),
        map(percentage => `scaleX(${percentage})`),
        takeUntil(this.complete$)
      );
  }
}
