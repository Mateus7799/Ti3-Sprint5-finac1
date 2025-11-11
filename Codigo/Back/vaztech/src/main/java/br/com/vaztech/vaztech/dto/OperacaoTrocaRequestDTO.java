package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record OperacaoTrocaRequestDTO(
        @NotBlank(message = "Valor é obrigatório")
        BigDecimal valor,

        @NotBlank(message = "Valor é obrigatório")
        BigDecimal valorAbatido,

        Integer metodoPagamento,

        @NotBlank(message = "ID do cliente ou fornecedor é obrigatório")
        Integer idPessoa,

        @NotBlank(message = "ID do funcionário é obrigatório")
        Integer idFuncionario,

        String observacoes,

        @Size(max = 50, message = "Número de série do produto vendido deve ter no máximo 50 caracteres")
        String numeroSerieProdutoVendido,

        @Size(max = 50, message = "Número de série do produto recebido deve ter no máximo 50 caracteres")
        String numeroSerieProdutoRecebido,

        ProdutoAddRequestDTO produtoVendido,

        ProdutoAddRequestDTO produtoRecebido
) {}