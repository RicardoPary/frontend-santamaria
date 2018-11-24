import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({selector: '[imgPreview]'})
export class ImagePreviewDirective implements OnChanges {

  @Input() private media: any;
  @Input() private type: any;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    let reader = new FileReader();
    let el = this.elementRef;
    if (this.type.split('/')[0] === 'image') {
      reader.onloadend = () => el.nativeElement.src = reader.result;
    }
    if (this.media) {
      return reader.readAsDataURL(this.media);
    }
  }
}
