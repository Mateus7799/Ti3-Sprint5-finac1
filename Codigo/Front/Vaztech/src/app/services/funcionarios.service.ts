import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  AlterarDadosPessoaisFuncionarioBody,
  CadastrarFuncionarioBody,
  FuncionarioResponse,
} from '../models/funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  http = inject(HttpClient);
  apiRoute = 'api/funcionario';

  buscarFuncionarios(): Observable<FuncionarioResponse[]> {
    return this.http.get<FuncionarioResponse[]>(`${environment.apiURL}/${this.apiRoute}`);
  }

  cadastrarFuncionario(funcionario: CadastrarFuncionarioBody): Observable<any> {
    // não tem retorno
    return this.http.post(`${environment.apiURL}/${this.apiRoute}`, funcionario);
  }

  editarFuncionario(funcionario: AlterarDadosPessoaisFuncionarioBody): Observable<any> {
    // não tem retorno
    return this.http.put(`${environment.apiURL}/${this.apiRoute}/${funcionario.id}`, funcionario);
  }

  mudarCodigoFuncionario(id: number, novoCodigo: number): Observable<any> {
    // não tem retorno
    return this.http.put(`${environment.apiURL}/${this.apiRoute}/${id.toString()}`, {
      codFuncionario: novoCodigo,
    });
  }
}
