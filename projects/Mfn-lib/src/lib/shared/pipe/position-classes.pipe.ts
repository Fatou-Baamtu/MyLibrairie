import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../interface/Position';

@Pipe({
  name: 'positionClasses',
  standalone: true
})
export class PositionClassesPipe implements PipeTransform {
  private readonly positionClasses: Record<Position, string> = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'middle-left': 'top-1/2 left-4 -translate-y-1/2',
    'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'middle-right': 'top-1/2 right-4 -translate-y-1/2',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  };

  transform(position: Position = 'top-right'): string {
    return this.positionClasses[position];
  }
}
