import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue',
})
export class KeyvaluePipe implements PipeTransform {

  transform(value: any): any {
      return Object.keys(value);
  }
}
