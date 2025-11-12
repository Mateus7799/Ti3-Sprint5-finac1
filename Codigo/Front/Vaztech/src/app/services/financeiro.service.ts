import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, map } from 'rxjs';
import {
  DadosFinanceirosMes,
  FinanceiroFaturamentoResponseDTO,
} from '../models/financeiro.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  http = inject(HttpClient);
  apiRoute = 'api/financeiro';

  buscarDadosMes(ano: number, mes: number): Observable<DadosFinanceirosMes> {
    return forkJoin({
      vendas: this.buscarFaturamento(ano, mes),
      compras: this.buscarCusto(ano, mes),
    }).pipe(
      map((result) => {
        const faturamento = result.vendas.faturamentoMesAtual;
        const custo = result.compras.faturamentoMesAtual;
        const lucro = faturamento - custo;

        return {
          faturamento,
          custo,
          lucro,
          mes,
          ano,
        };
      }),
    );
  }

  private buscarFaturamento(ano: number, mes: number): Observable<FinanceiroFaturamentoResponseDTO> {
    return this.http.get<FinanceiroFaturamentoResponseDTO>(
      `${environment.apiURL}/${this.apiRoute}/faturamento-mensal?anoAtual=${ano}&mesAtual=${mes}`,
    );
  }

  private buscarCusto(ano: number, mes: number): Observable<FinanceiroFaturamentoResponseDTO> {
    return this.http.get<FinanceiroFaturamentoResponseDTO>(
      `${environment.apiURL}/${this.apiRoute}/custo-mensal?anoAtual=${ano}&mesAtual=${mes}`,
    );
  }
}