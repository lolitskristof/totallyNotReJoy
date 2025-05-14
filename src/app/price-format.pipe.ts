import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true,
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== 'number') return '';

    const formatted = value.toLocaleString('hu-HU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return `${formatted} Ft`;
  }
}
