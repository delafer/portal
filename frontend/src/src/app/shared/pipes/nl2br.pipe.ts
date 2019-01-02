import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value !== void 0) {

      if (Array.isArray(value))  {
        console.log("aaaaaaa!",value);
        let res = '';
        for (let next of value) {
          if (res.length!==0) res += '\r\n';
          res += next;
        }
        return res;
      } else {
        return value.replace(/,/g, '\r\n');
      }



    }
    return value;
  }

}
