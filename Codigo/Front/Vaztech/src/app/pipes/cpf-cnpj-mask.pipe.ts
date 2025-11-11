import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpjMask',
  standalone: true
})
export class CpfCnpjMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      return numbers.substring(0, 14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  }
}
