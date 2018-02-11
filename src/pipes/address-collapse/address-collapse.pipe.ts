import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'addressCollapse'})
export class AddressCollapsePipe implements PipeTransform {
  transform (value: string) {
    return value.substr(0, value.length / 3) + '...' + value.substr(value.length / 3 + value.length / 3, value.length / 3)
  }
}