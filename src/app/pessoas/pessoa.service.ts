import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Pessoa} from './../core/model';
import {PessoaHttp} from '../seguranca/pessoa-http';
import {environment} from '../../environments/environment';
import * as moment from 'moment';

export class PessoaFiltro {
  nome: string;
  cpf: string;
  dataNascimento: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: PessoaHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });


    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }
    if (filtro.cpf) {
      params = params.append('cpf', filtro.cpf);
    }

    return this.http.get<any>(`${this.pessoasUrl}`, {params})
      .toPromise()
      .then(response => {
        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => {
        const pessoaAlterado = response;

        this.converterStringsParaDatas([pessoaAlterado]);

        return pessoaAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response;

        this.converterStringsParaDatas([pessoa]);

        return pessoa;
      });
  }


  private converterStringsParaDatas(pessoas: Pessoa[]) {
    for (const pessoa of pessoas) {
      pessoa.dataNascimento = moment(pessoa.dataNascimento, 'YY-MM-DD').toDate();
      pessoa.dataDoCadastro = moment(pessoa.dataDoCadastro, 'YYYY-MM-DD HH:mm:ss').toDate();

      if (pessoa.dataDaAlteracao) {
        pessoa.dataDaAlteracao = moment(pessoa.dataDaAlteracao, 'YYYY-MM-DD HH:mm:ss').toDate();
      }
    }
  }

}
