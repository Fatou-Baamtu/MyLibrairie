import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PositionClassesPipe} from '../../shared/pipe/position-classes.pipe';
import {VariantClassesPipe} from '../../shared/pipe/variant-classes.pipe';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AlertData} from '../interfaces/alert.interface';

@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [CommonModule, PositionClassesPipe, VariantClassesPipe],
  animations: [
    trigger('slideIn', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state('*', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('200ms ease-in'))
    ])
  ],
  template: `
    <div *ngIf="visible"
         [@slideIn]
         class="fixed z-50 p-4 rounded-lg shadow-lg max-w-sm pointer-events-auto {{ config.position | positionClasses }} {{ config.type | variantClasses:'light' }}"
         role="alert">
      <div class="flex items-center w-full">
        <div class="flex-grow">
          <div *ngIf="config.title" class="font-semibold mb-1">{{ config.title }}</div>
          <div class="text-sm">{{ config.message }}</div>
        </div>
        <button *ngIf="config.dismissible !== false"
                (click)="close()"
                class="ml-4 p-1 hover:bg-black/10 rounded-full transition-colors"
                aria-label="Fermer">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  `
})
export class AlertComponent {
  @Input() config!: AlertData;
  @Output() closed = new EventEmitter<string>();

  visible = true;

  close(): void {
    this.visible = false;
    setTimeout(() => {
      this.closed.emit(this.config.id);
    }, 200);
  }
}

