import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'angular-banner-slider',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    NgTemplateOutlet
  ],
  template: `
    <div class="flex flex-col items-center py-16">
      <div class="flex w-full">
        <ng-container *ngTemplateOutlet="arrow"></ng-container>
        @if (banners[index()]; as banner) {
          <div class="w-full relative">
            <img class="w-full" [src]="banner.img" [alt]="banner.seoText">
            <div class="absolute bottom-10 w-full flex justify-center">
              <button (click)="pressedButton.emit(index())"
                      [ngStyle]="{ color: banner.button.color, backgroundColor: banner.button.bgColor }"
                      class="border border-black px-4 py-2">{{ banner.button.text }}</button>
            </div>
          </div>
        }
        <ng-container *ngTemplateOutlet="arrow; context: { rotate: true }"></ng-container>
      </div>
      <div class="flex gap-4 mt-4">
        @for (banner of banners; track banner; let i = $index) {
          <button class="h-2 w-8"
                  (click)="setIndex(i)"
                  [ngStyle]="{ backgroundColor: index() === i ? '#E2725B' : '#EEC0B6' }">
          </button>
        }
      </div>
    </div>

    <ng-template #arrow let-rotate='rotate'>
      <button
        (click)="rotate ? nextIndex() : prevIndex()"
        [ngClass]="{ 'rotate-180': rotate }"
        class="p-12 flex items-center">
        <img src="/assets/plugins-assets/banners/arrow.svg" alt="arrow">
      </button>
    </ng-template>
  `,
  styleUrls: [
    "./angular-banner-slider.component.css"
  ]
})
export class AngularBannerSlider {
  @Input() banners!: Banner[];
  @Output() pressedButton = new EventEmitter<number>();

  index = signal(0);

  nextIndex() {
    if (this.index() < this.banners.length - 1) {
      this.index.set(this.index() + 1);
    } else {
      this.index.set(0);
    }
  }

  prevIndex() {
    if (this.index() > 0) {
      this.index.set(this.index() - 1);
    } else {
      this.index.set(this.banners.length - 1);
    }
  }

  setIndex(i: number) {
    this.index.set(i);
  }
}

export interface Banner {
  img: string
  seoText: string
  button: {
    color: string
    bgColor: string
    text: string
  }
}
