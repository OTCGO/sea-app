import { NgModule } from '@angular/core'
import { AddressCollapsePipe } from './address-collapse/address-collapse.pipe'
import { DateFormatPipe } from './date-format.pipe'
import { BalanceSortPipe } from './balance-sort.pipe'

const PIPES = [
  AddressCollapsePipe,
  DateFormatPipe,
  BalanceSortPipe
]

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {
}
