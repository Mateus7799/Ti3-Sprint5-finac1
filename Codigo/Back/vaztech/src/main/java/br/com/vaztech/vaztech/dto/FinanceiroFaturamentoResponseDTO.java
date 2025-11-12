package br.com.vaztech.vaztech.dto;

import java.math.BigDecimal;

public record FinanceiroFaturamentoResponseDTO(
        BigDecimal faturamentoMesAtual,
        String anoMesAtual, // Formato "YYYY-MM"
        BigDecimal faturamentoMesComparacao, // Nulo se não houver comparação
        String anoMesComparacao, // Nulo se não houver comparação
        BigDecimal margem // Percentual (ex: 15.50 para 15.50%) Nulo se não houver comparação
) {
}