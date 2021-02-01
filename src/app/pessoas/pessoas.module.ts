import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import {TableModule} from 'primeng/table';
import {
  ButtonModule,
  CalendarModule,
  InputMaskModule,
  InputTextModule,
  RadioButtonModule,
  TabViewModule,
  TooltipModule
} from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TableModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    InputMaskModule,
    RadioButtonModule,
    CalendarModule,

    SharedModule,
    PessoasRoutingModule,
    TabViewModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: []
})
export class PessoasModule { }
