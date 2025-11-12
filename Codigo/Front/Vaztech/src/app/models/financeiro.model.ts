export type DadosFinanceirosMes = {
  faturamento: number;
  custo: number;
  lucro: number;
  mes: number;
  ano: number;
  mesNome?: string;
};

export type ComparacaoMeses = {
  mes1: DadosFinanceirosMes;
  mes2: DadosFinanceirosMes;
  diferencaPercentual: {
    faturamento: number;
    custo: number;
    lucro: number;
  };
};

export type FinanceiroFaturamentoResponseDTO = {
  faturamentoMesAtual: number;
  anoMesAtual: string;
  faturamentoMesComparacao: number | null;
  anoMesComparacao: string | null;
  margem: number | null;
};
