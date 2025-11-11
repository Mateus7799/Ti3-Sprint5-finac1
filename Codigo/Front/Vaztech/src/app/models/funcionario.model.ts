export type FuncionarioResponse = {
  id: number;
  nome: string;
  dataNascimento: Date;
  status: number;
  cpf: string;
};

export type CadastrarFuncionarioBody = {
  nome: string;
  dataNascimento: Date;
  cpf: string;
  codFuncionario: number;
};

export type AlterarDadosPessoaisFuncionarioBody = {
  id: number;
  nome: string;
  dataNascimento: Date;
  cpf: string;
};
