package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ServicoAddRequestDTO(
        @NotNull(message = "ID do produto é obrigatório")
        Integer idProduto,

        @NotNull(message = "Tipo é obrigatório")
        Integer tipo,

        @NotNull(message = "Valor é obrigatório")
        @DecimalMin(value = "0.0", inclusive = false, message = "Valor deve ser maior que zero")
        BigDecimal valor,

        Integer idPessoa,

        LocalDate dataInicio,

        LocalDate dataFim,

        String observacoes,

        Integer idStatus
) {}
