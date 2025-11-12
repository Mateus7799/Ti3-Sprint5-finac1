package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ServicoAddRequestDTO(
        @Size(max = 50, message = "Número de série do produto deve ter no máximo 50 caracteres")
        String numeroSerieProduto,

        @NotNull(message = "Tipo é obrigatório")
        Integer tipo,

        @NotNull(message = "Valor é obrigatório")
        @DecimalMin(value = "0.0", inclusive = false, message = "Valor deve ser maior que zero")
        BigDecimal valor,

        Integer idPessoa,

        LocalDate dataInicio,

        LocalDate dataFim,

        String observacoes,

        Integer idStatus,

        Integer metodoPagamento,

        ProdutoAddRequestDTO produto
) {}
