import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { forkJoin, map, Observable } from 'rxjs';
import { OperacoesReq } from '../models/operacao.model';

export type DadosFinanceiros = {
  faturamento: number;
  custo: number;
  lucro: number;
  mes: number;
  ano: number;
};

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  http = inject(HttpClient);
  apiRoute = 'api/operacao';

  buscarDadosFinanceiros(mes: number, ano: number): Observable<DadosFinanceiros> {
    return forkJoin({
      vendas: this.buscarOperacoesPorMes(0, mes, ano),
      compras: this.buscarOperacoesPorMes(1, mes, ano),
    }).pipe(
      map(({ vendas, compras }) => {
        const faturamento = vendas.reduce((sum, op) => sum + op.valor, 0);
        const custo = compras.reduce((sum, op) => sum + op.valor, 0);
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

  private buscarOperacoesPorMes(tipo: 0 | 1, mes: number, ano: number): Observable<any[]> {
    return this.http
      .get<OperacoesReq>(
        `${environment.apiURL}/${this.apiRoute}?tipo=${tipo}&page=0&size=10000`,
      )
      .pipe(
        map((response) => {
          return response.content.filter((operacao) => {
            const dataOperacao = new Date(operacao.dataHoraTransacao);
            return (
              dataOperacao.getMonth() === mes && dataOperacao.getFullYear() === ano
            );
          });
        }),
      );
  }
}
