import { PessoaResponse } from './pessoa.model';
import { Produto } from './produto.model';

export enum TiposServico {
  EXTERNO,
  INTERNO,
}

export type StatusServico = {
  id: number;
  nome: string;
};

export type Servico = {
  id: number;
  produto: Produto;
  tipo: TiposServico;
  valor: number;
  pessoa: PessoaResponse;
  dataInicio: Date;
  dataFim: Date;
  observacoes: string;
  status: StatusServico;
};

export type PessoaServico = {
  id: number;
  nome: string;
  cpfCnpj: string;
};

export type ProdutoServico = {
  id: number;
  numeroSerie: string;
  aparelho: string;
  modelo: string;
};

export type AdicionarServicoDTO = {
  numeroSerieProduto: string | null;
  valor: number;
  idPessoa: number;
  metodoPagamento: number;
  tipo: TiposServico;
  observacoes?: string;
  produto?: Produto;
};

export type ServicosReqDTO = {
  content: Servico[];
  totalElements: number;
  totalPages: number;
  size: number;
};