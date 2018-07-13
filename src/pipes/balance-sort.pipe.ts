import { Pipe, PipeTransform } from '@angular/core'
 import { balanceSort } from '../shared/utils'

@Pipe({
    name: 'BalanceSortPipe',
})
export class BalanceSortPipe implements PipeTransform {
    transform(value: any) {

        console.log('BalanceSortPipe', balanceSort(value))

        return balanceSort(value)
    }
}

