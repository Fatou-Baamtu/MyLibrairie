import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgIf } from '@angular/common';
import {ToastData} from '../interfaces/toast.interface';
import {PositionClassesPipe} from '../../shared/pipe/position-classes.pipe';
import {VariantClassesPipe} from '../../shared/pipe/variant-classes.pipe';

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [ NgIf, PositionClassesPipe, VariantClassesPipe],
  template: `
    <div *ngIf="visible" [@toastAnimation]
         class="fixed z-50 flex items-center p-4 rounded-lg shadow-lg max-w-sm {{ data.position | positionClasses }} {{ data.type | variantClasses:'solid' }}"
         role="alert"
         [style.background-color]="data.backgroundColor"
         [style.color]="data.textColor">
      <div class="ms-3 text-sm font-normal">
        <div *ngIf="data.title" class="font-semibold mb-1">{{ data.title }}</div>
        <div>{{ data.message }}</div>
      </div>
      <button type="button"
              class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8"
              (click)="close()">
        <span class="sr-only">Fermer</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  `,
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('300ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({
          transform: 'translateX(100%)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  @Input() data!: ToastData;
  visible = true;

  ngOnInit() {
    if (this.data.duration !== 0) {
      setTimeout(() => {
        this.close();
      }, this.data.duration || 3000);
    }
  }
  close() {
    this.visible = false;
  }
}
