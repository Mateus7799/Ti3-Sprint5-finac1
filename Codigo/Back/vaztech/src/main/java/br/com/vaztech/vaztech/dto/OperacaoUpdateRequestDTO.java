package br.com.vaztech.vaztech.dto;

import java.math.BigDecimal;

public record OperacaoUpdateRequestDTO(
        BigDecimal valor,
        Integer tipo,
        String observacoes,
        Integer metodoPagamento
) {}
