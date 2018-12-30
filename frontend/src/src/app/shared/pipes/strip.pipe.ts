import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strip'
})
export class StripPipe implements PipeTransform {

  transform(value: any, len: number = 255): any {
    if (value !== void 0 && value.length > len) {
      //return value.replace(/\n/g, '<br>');
      return value.substring(0, len) + '...';
    }
    return value;
  }

}
