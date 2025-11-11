import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  AdicionarOperacaoDTO,
  AdicionarOperacaoTrocaDTO,
  EditarOperacaoDTO,
  FuncionarioOperacao,
  OperacoesReq,
  PessoaOperacao,
  ProdutoOperacao,
} from '../models/operacao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperacoesService {
  http = inject(HttpClient);
  apiRoute = 'api/operacao';

  listarOperacoes(
    tipo: 'compras' | 'vendas',
    pagina: number = 0,
    size: number = 4,
    id: string = '',
  ): Observable<OperacoesReq> {
    const t = tipo === 'vendas' ? 0 : 1;
    return this.http.get<OperacoesReq>(
      `${environment.apiURL}/${this.apiRoute}?tipo=${t}&page=${pagina}&size=${size}&id=${!!id ? Number.parseInt(id) : ''}`,
    );
  }

  adicionarOperacao(operacao: AdicionarOperacaoDTO | AdicionarOperacaoTrocaDTO, troca?: boolean) {
    if (troca) {
      return this.http.post(`${environment.apiURL}/${this.apiRoute}/troca`, operacao);
    }
    return this.http.post(`${environment.apiURL}/${this.apiRoute}`, operacao);
  }

  editarOperacao(operacao: EditarOperacaoDTO, id: number) {
    return this.http.put(`${environment.apiURL}/${this.apiRoute}/${id}`, operacao);
  }

  validarFuncionario(idOperacao: number, codFuncionario: string) {
    return this.http.get(
      `${environment.apiURL}/${this.apiRoute}/${idOperacao}/validar-funcionario?codigo=${codFuncionario}`,
    );
  }

  funcionariosQuery(busca: string): Observable<FuncionarioOperacao[]> {
    return this.http.get<FuncionarioOperacao[]>(
      `${environment.apiURL}/api/funcionario/buscar?query=${busca}`,
    );
  }

  pessoasQuery(busca: string): Observable<PessoaOperacao[]> {
    return this.http.get<PessoaOperacao[]>(
      `${environment.apiURL}/api/pessoa/buscar?query=${busca}`,
    );
  }

  produtosQuery(busca: string): Observable<ProdutoOperacao[]> {
    return this.http.get<ProdutoOperacao[]>(
      `${environment.apiURL}/api/produto/buscar?query=${busca}`,
    );
  }
}
