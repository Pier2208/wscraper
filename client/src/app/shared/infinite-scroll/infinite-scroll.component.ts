import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Input,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  template: '<ng-content></ng-content><div #anchor></div>',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() options = {};
  @ViewChild('anchor', { static: true }) anchor: ElementRef<HTMLElement>;
  @Output() scrolled = new EventEmitter();

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) {}

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit(): void {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return (
      style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll'
    );
  }
}
