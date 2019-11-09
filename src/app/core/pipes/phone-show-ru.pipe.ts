import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneShow'
})
export class PhoneShowRuPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let phone = value;
    if (phone) {
      phone = phone.replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\+/g, '');
      if (phone.length === 11) {
        phone = phone.slice(0, 1) + ' (' + phone.slice(1, 4) + ') ' +
                phone.slice(4, 7) + ' ' + phone.slice(7, 9) + ' ' + phone.slice(9, 11);
      }
      return '+' + phone;
    }
    return 'Нет номера';
  }

}
