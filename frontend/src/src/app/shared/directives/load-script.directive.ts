import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appLoadScript]'
})
export class LoadScriptDirective implements OnInit, AfterViewInit, OnDestroy {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @Input('script') param:  any;

  private node: any;

   public logStuff(): any {
    console.log(123);
  }

  ngOnInit() {
    /* this.node = this.renderer.createElement('script');
    this.node.innerHTML = '';
    this.node = this.param;
    this.node.type = 'text/javascript';
    this.node.async = false;
    this.node.defer = true;
    */
    // const fragment = document.createRange().createContextualFragment("<script id='script' src=\"http://www.java-soft.org/adm/embed.js?game=HalloweenMahjong&width=800&height=480&bgcolor=white\"></script>");
    const fragment = document.createRange().createContextualFragment('<iframe id="ZMgameFrame" src="http://cdn.htmlgames.com/HalloweenMahjong/index.html?bgcolor=white" width="800" height="480" frameborder="0" style="display:block" allowfullscreen></iframe>');
    this.node = fragment;
    this.renderer.appendChild(this.el.nativeElement, fragment);
  }

  ngAfterViewInit() {
    console.log(`called directive with ${this.el.nativeElement}`);
  }

  ngOnDestroy(): void {
   //this.renderer.removeChild(this.el.nativeElement, this.node);
  }

}
