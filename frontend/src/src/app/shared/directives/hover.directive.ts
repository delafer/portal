import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  @HostBinding('class.hovered') isHovered = false;

  @HostListener('mouseover') onMouseOver() {
    console.log('on mouse enter!');
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('on mouse leave!');
    this.isHovered = false;
  }
  constructor() { }

}
