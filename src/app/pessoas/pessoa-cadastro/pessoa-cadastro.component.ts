import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

import {MessageService} from 'primeng/components/common/messageservice';

import {ErrorHandlerService} from './../../core/error-handler.service';
import {PessoaService} from './../pessoa.service';
import {Pessoa} from './../../core/model';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  formulario: FormGroup;
  pessoa = new Pessoa();
  pt: any;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {  }

  ngOnInit() {
    this.calendarioEmPtBr();
    this.configurarFormulario();
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova pessoa');
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      nome: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      sexo: [],
      email: [, this.validaEmail],
      dataNascimento: [null, this.validarObrigatoriedade],
      naturalidade: [],
      nacionalidade: [],
      cpf: [null, [this.validaCpf, this.validarObrigatoriedade]],
      dataDoCadastro: [],
      dataDaAlteracao: []
    });
  }



  validaEmail(input: FormControl) {
    const emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (input.value) {
      if (input.value.search(emailRegEx) === 0) {
        return null;
      } else {
        return {email: true};
      }
    }
    return null;
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : {obrigatoriedade: true});
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor ? null : {tamanhoMinimo: {tamanho: valor}})
    }
  }

  validaCpf(input: FormControl) {
    if (input.value != null) {
      const cpf = input.value.replace(/\D+/g, '');
      if (cpf.length === 11) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return {cpfNotValid: true};
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return {cpfNotValid: true};
          }
          return null;
        } else {
          return {cpfNotValid: true};
        }
      }
    }
    return null;
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.formulario.patchValue(pessoa);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.adicionar(this.formulario.value)
      .then(pessoaAdicionada => {
        this.messageService.add({severity: 'success', detail: 'Pessoa adicionada com sucesso!'});
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.formulario.value)
      .then(pessoa => {
        this.formulario.patchValue(pessoa);

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova() {
    this.formulario.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.formulario.get('nome').value}`);
  }

  calendarioEmPtBr() {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      // tslint:disable-next-line:max-line-length
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dev'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Semana'
    };
  }

}
