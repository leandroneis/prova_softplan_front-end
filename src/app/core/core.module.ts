import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgModule, LOCALE_ID} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { JwtHelperService } from '@auth0/angular-jwt';
import {SourceService} from '../sources/source.service';

import {AuthService} from './../seguranca/auth.service';
import {ErrorHandlerService} from './error-handler.service';
import {PessoaService} from './../pessoas/pessoa.service';
import {NavbarComponent} from './navbar/navbar.component';
import {NaoAutorizadoComponent} from './nao-autorizado.component';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada.component';
import {PessoaHttp} from '../seguranca/pessoa-http';
import {SourcesModule} from '../sources/sources.module';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SourcesModule,

    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent

  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule

  ],
  providers: [
    PessoaService,
    ErrorHandlerService,
    AuthService,
    SourceService,
    PessoaHttp,

    ConfirmationService,
    JwtHelperService,
    MessageService,
    Title,
    {provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class CoreModule {
}

