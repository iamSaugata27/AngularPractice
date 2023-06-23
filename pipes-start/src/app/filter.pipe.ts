import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: { instanceType: string, name: string, status: string, started: Date }[], filteredString: string, propName: string): unknown {
    if (value.length === 0 || filteredString === '')
      return value;
    const resultArray = [];
    for (let item of value) {
      if (item[propName] === filteredString)
        resultArray.push(item);
    }
    return resultArray;
  }
}
