import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Produto, ProdutosReqDTO, ProdutoStatus } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  http = inject(HttpClient);
  apiRoute = 'api/produto';

  paginaPadrao = 0;
  tamanhoPaginaPadrao = 10;

  buscarItens(
    pagina: number = this.paginaPadrao,
    tamanhoPagina: number = this.tamanhoPaginaPadrao,
    searchText?: string,
  ): Observable<ProdutosReqDTO> {
    return this.http.get<ProdutosReqDTO>(
      `${environment.apiURL}/${this.apiRoute}?page=${pagina}&size=${tamanhoPagina}${(searchText?.length ?? 0) > 0 ? '&searchTerm=' + searchText : ''}`,
    );
  }

  buscarStatusProdutos(): Observable<ProdutoStatus[]> {
    return this.http.get<ProdutoStatus[]>(`${environment.apiURL}/${this.apiRoute}/status`);
  }

  adicionarProduto(produto: Produto) {
    return this.http.post(`${environment.apiURL}/${this.apiRoute}`, produto);
  }

  editarProduto(produto: Produto) {
    return this.http.put(`${environment.apiURL}/${this.apiRoute}/${produto.numeroSerie}`, produto);
  }
}
