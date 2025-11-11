import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  AlterarPessoaBody,
  CadastrarPessoaBody,
  PessoaResponse,
  PessoasReqDTO,
} from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  http = inject(HttpClient);
  apiRoute = 'api/pessoa';

  paginaPadrao = 0;
  tamanhoPaginaPadrao = 4;

  buscarPessoas(
    pagina: number = this.paginaPadrao,
    tamPagina: number = this.tamanhoPaginaPadrao,
    query: string = '',
  ): Observable<PessoasReqDTO> {
    return this.http.get<PessoasReqDTO>(
      `${environment.apiURL}/${this.apiRoute}/listar?page=${pagina}&size=${tamPagina}${query.length > 0 ? '&searchTerm=' + query : ''}`,
    );
  }

  cadastrarPessoa(pessoa: CadastrarPessoaBody): Observable<PessoaResponse> {
    return this.http.post<PessoaResponse>(`${environment.apiURL}/${this.apiRoute}`, pessoa);
  }

  editarPessoa(pessoa: AlterarPessoaBody): Observable<PessoaResponse> {
    return this.http.put<PessoaResponse>(
      `${environment.apiURL}/${this.apiRoute}/${pessoa.id}`,
      pessoa,
    );
  }
}
