import { NgModule } from "@angular/core";
import { AddressCollapsePipe } from "./address-collapse/address-collapse.pipe";

const PIPES = [
  AddressCollapsePipe
]

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule {}