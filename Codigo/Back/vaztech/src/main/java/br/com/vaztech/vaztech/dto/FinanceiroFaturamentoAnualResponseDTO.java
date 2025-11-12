package br.com.vaztech.vaztech.dto;

import java.math.BigDecimal;
import java.util.List;

public record FinanceiroFaturamentoAnualResponseDTO(
        Integer ano,
        BigDecimal faturamentoTotalAnual,
        List<FaturamentoMensalDetalhe> faturamentoMensal
) {

    public record FaturamentoMensalDetalhe(
            Integer mes,
            String mesNome, // Ex: "Janeiro", "Fevereiro"...
            BigDecimal total
    ) {}
}