import { FormaPagamento } from './forma-pagamento.model';
import { Produto } from './produto.model';

export type Operacao = {
  id: number;
  produto: ProdutoOperacao;
  funcionario: FuncionarioOperacao;
  pessoa: PessoaOperacao;
  valor: number;
  tipo: 0 | 1 | 2;
  observacoes: string;
  dataHoraTransacao: Date;
  formaPagmento: FormaPagamento[];
  troca?: {
    valorAbatido: number;
    produtoRecebido: ProdutoOperacao;
  };
};

export type PessoaOperacao = {
  id: number;
  nome: string;
  cpfCnpj: string;
};

export type ProdutoOperacao = {
  id: number;
  numeroSerie: string;
  aparelho: string;
  modelo: string;
};

export type FuncionarioOperacao = {
  id: number;
  nome: string;
};

export type AdicionarOperacaoDTO = {
  numeroSerieProduto: string | null;
  valor: number;
  idPessoa: number;
  idFuncionario: number;
  formaPagamento: number;
  tipo: 0 | 1 | 2;
  observacoes?: string;
  produto?: Produto;
};

export type AdicionarOperacaoTrocaDTO = {
  numeroSerieProdutoVendido: string | null;
  numeroSerieProdutoRecebido: string | null;
  valor: number;
  idPessoa: number;
  idFuncionario: number;
  formaPagamento: number;
  produtoVendido?: Produto;
  produtoRecebido?: Produto;
};

export type EditarOperacaoDTO = {
  valor: number;
  tipo: 0 | 1;
  observacoes?: string;
};

export type OperacoesReq = {
  content: Operacao[];
  totalElements: number;
};
