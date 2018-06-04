import { NgModule } from '@angular/core'
import { AddressCollapsePipe } from './address-collapse/address-collapse.pipe'
import { DateFormatPipe } from './date-format.pipe'

const PIPES = [
  AddressCollapsePipe,
  DateFormatPipe
]

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {
}
