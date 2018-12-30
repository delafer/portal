import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[iframe]'
})
export class IframeDirective implements OnInit, AfterViewInit, OnDestroy {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @Input('src') param: string;


  ngOnInit() {
    if (this.param) {
      const fragment = document.createRange().createContextualFragment(this.param);
      this.renderer.appendChild(this.el.nativeElement, fragment);
    }
  }

  ngAfterViewInit() {
    /* console.log(`called directive with ${this.el.nativeElement}`); */
  }

  ngOnDestroy(): void {
  }

}
