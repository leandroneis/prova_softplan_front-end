import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodigoFonteComponent } from './codigo-fonte/codigo-fonte.component';
import { SourcesRoutingModule } from './sources-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SourcesRoutingModule
  ],
  declarations: [CodigoFonteComponent]
})
export class SourcesModule { }



