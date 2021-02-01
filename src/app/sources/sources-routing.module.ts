import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CodigoFonteComponent } from './codigo-fonte/codigo-fonte.component';

const routes: Routes = [
  {
    path: 'source',
    component: CodigoFonteComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SourcesRoutingModule { }
