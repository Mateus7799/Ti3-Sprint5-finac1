package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record OperacaoAddRequestDTO (
        @Size(max = 50, message = "Número de série do produto deve ter no máximo 50 caracteres")
        String numeroSerieProduto,

        @NotBlank(message = "Valor é obrigatório")
        BigDecimal valor,

        @NotBlank(message = "ID do cliente ou fornecedor é obrigatório")
        Integer idPessoa,

        @NotBlank(message = "ID do funcionário é obrigatório")
        Integer idFuncionario,

        @NotBlank(message = "Tipo da operação é obrigatória")
        Integer tipo,
        String observacoes,
        ProdutoAddRequestDTO produto,
        Integer metodoPagamento
) {}