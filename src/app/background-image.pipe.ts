import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'backgroundImage'
})
export class BackgroundImagePipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  transform(src: string) {
    const sanitized = this.domSanitizer.sanitize(SecurityContext.URL, src);
    return this.domSanitizer.bypassSecurityTrustStyle(`url(${sanitized})`);
  }
}
