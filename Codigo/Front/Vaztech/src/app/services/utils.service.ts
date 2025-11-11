import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormaPagamento } from '../models/forma-pagamento.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  http = inject(HttpClient);

  buscarFormasPagamento(): Observable<FormaPagamento[]> {
    const apiRoute = 'api/metodo-pagamento';
    // mock
    return of([
      {
        id: 0,
        nome: 'Dinheiro',
      },
      {
        id: 1,
        nome: 'PIX',
      },
      {
        id: 2,
        nome: 'Cartão de Crédito',
      },
      {
        id: 3,
        nome: 'Cartão de Débito',
      },
    ]);
  }
}
