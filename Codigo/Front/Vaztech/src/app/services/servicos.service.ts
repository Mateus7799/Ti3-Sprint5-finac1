import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProdutoStatus } from '../models/produto.model';
import { Servico, ServicosReqDTO, StatusServico, TiposServico } from '../models/servico.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  http = inject(HttpClient);

  listarServicosStatus(): Observable<StatusServico[]> {
    // MOCKADO
    return of([
      { id: 0, nome: 'Em andamento' },
      { id: 1, nome: 'Finalizado' },
    ]);
  }

  buscarServicos(): Observable<ServicosReqDTO> {
    // MOCKADO
    const produtoStatus: ProdutoStatus[] = [
      {
        id: 0,
        nome: 'EM ESTOQUE',
      },
      {
        id: 1,
        nome: 'VENDIDO',
      },
    ];
    const mock: Servico[] = [
      {
        id: 1,
        produto: {
          numeroSerie: 'SN00123456',
          aparelho: 'iPhone 13',
          modelo: 'A2482',
          observacoes: 'Tela trincada',
          status: produtoStatus[0],
          cor: 'Preto',
        },
        tipo: TiposServico.EXTERNO,
        valor: 450.0,
        pessoa: {
          id: 1,
          nome: 'João Silva',
          cpfCnpj: '123.456.789-00',
          dataNascimento: new Date('1985-05-15'),
          origem: 'Loja A',
        },
        dataInicio: new Date('2024-01-15'),
        dataFim: new Date('2024-01-20'),
        observacoes: 'Troca da tela do iPhone 13 - cliente solicitou urgência',
        status: {
          id: 1,
          nome: 'Finalizado',
        },
      },
      {
        id: 2,
        produto: {
          numeroSerie: 'SN00789456',
          aparelho: 'Samsung Galaxy S21',
          modelo: 'SM-G991B',
          observacoes: 'Bateria com defeito',
          status: produtoStatus[0],
          cor: 'Branco',
        },
        tipo: TiposServico.INTERNO,
        valor: 120.0,
        pessoa: {
          id: 2,
          nome: 'Maria Santos',
          cpfCnpj: '987.654.321-00',
          dataNascimento: new Date('1990-08-22'),
          origem: 'Site',
        },
        dataInicio: new Date('2024-01-18'),
        dataFim: new Date('2024-01-25'),
        observacoes: 'Substituição da bateria - aguardando peça do fornecedor',
        status: {
          id: 0,
          nome: 'Em andamento',
        },
      },
      {
        id: 3,
        produto: {
          numeroSerie: 'SN00567891',
          aparelho: 'iPad Air',
          modelo: 'A2588',
          observacoes: 'Não liga',
          status: produtoStatus[0],
          cor: 'Azul',
        },
        tipo: TiposServico.EXTERNO,
        valor: 890.0,
        pessoa: {
          id: 3,
          nome: 'Empresa XYZ Ltda',
          cpfCnpj: '12.345.678/0001-90',
          dataNascimento: null,
          origem: 'Parceiro',
        },
        dataInicio: new Date('2024-01-10'),
        dataFim: new Date('2024-01-30'),
        observacoes: 'Problema na placa mãe - análise em andamento',
        status: {
          id: 0,
          nome: 'Em andamento',
        },
      },
      {
        id: 4,
        produto: {
          numeroSerie: 'SN00987654',
          aparelho: 'MacBook Pro',
          modelo: 'A2338',
          observacoes: 'Teclado com problemas',
          status: produtoStatus[0],
          cor: 'Cinza Espacial',
        },
        tipo: TiposServico.INTERNO,
        valor: 320.0,
        pessoa: {
          id: 4,
          nome: 'Carlos Oliveira',
          cpfCnpj: '456.789.123-00',
          dataNascimento: new Date('1978-12-10'),
          origem: 'Loja B',
        },
        dataInicio: new Date('2024-01-05'),
        dataFim: new Date('2024-01-12'),
        observacoes: 'Troca completa do teclado - serviço finalizado',
        status: {
          id: 1,
          nome: 'Finalizado',
        },
      },
    ];
    return of({
      content: [...mock],
      totalElements: mock.length,
      totalPages: mock.length / 6,
      size: 6,
    });
  }

  adicionarServico(servico: Servico) {}

  concluirServico(servico: Servico) {}

  editarServico(novoServico: Servico) {}
}
