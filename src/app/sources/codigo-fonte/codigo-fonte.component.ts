import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { SourceService } from '../source.service';

@Component({
  selector: 'app-codigo-fonte',
  templateUrl: './codigo-fonte.component.html',
  styleUrls: ['./codigo-fonte.component.css']
})
export class CodigoFonteComponent implements OnInit {
  urlCodigos = [];

  constructor(private sourceService: SourceService, private errorHandler: ErrorHandlerService, private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('Url Código Fonte');
    this.carregarUrl();
  }

  carregarUrl() {
    return this.sourceService.buscar()
      .then(resposta => {
        this.urlCodigos = [ resposta.urlBackend, resposta.urlFrontend ];
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
