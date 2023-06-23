import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: { instanceType: string, name: string, status: string, started: Date }[], propName: string): any {
    return value.sort((a, b) => a[propName] > b[propName] ? 1 : -1)
  }

}
