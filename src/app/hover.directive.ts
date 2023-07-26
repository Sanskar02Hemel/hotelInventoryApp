import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective {

  color: string = 'red';
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.color;
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.color);
  }

  // to change color of element on hover event
  @HostListener('mouseenter') onMouseEnter() {
      this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'blue');
    }

  @HostListener('mouseleave') onMouseLeave() {
      this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'white');
    }

}
