import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'addressCollapse'})
export class AddressCollapsePipe implements PipeTransform {
  transform (value: string) {
		const third = value.length / 3
    const twoThirds = third * 2
    return value.substr(0, third) + '...' + value.substr(twoThirds, third + 1)
  }
}
