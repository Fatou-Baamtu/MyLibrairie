import { Pipe, PipeTransform } from '@angular/core';
import { Type } from '../interface/Type';

@Pipe({
  name: 'variantClasses',
  standalone: true
})
export class VariantClassesPipe implements PipeTransform {
  private readonly lightVariants: Record<Type, string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800'
  };

  private readonly solidVariants: Record<Type, string> = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
    default: 'bg-gray-500 text-white'
  };

  transform(type: Type = 'default', variant: 'light' | 'solid' = 'light'): string {
    return variant === 'light' ? this.lightVariants[type] : this.solidVariants[type];
  }
}
