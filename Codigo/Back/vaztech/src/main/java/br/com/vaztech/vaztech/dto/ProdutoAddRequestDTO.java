package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProdutoAddRequestDTO (
        @NotBlank(message = "Número de série é obrigatório")
        @Size(max = 50, message = "Número de série deve ter no máximo 50 caracteres")
        String numeroSerie,

        @NotBlank(message = "Aparelho é obrigatório")
        @Size(max = 50, message = "Aparelho deve ter no máximo 50 caracteres")
        String aparelho,

        @Size(max = 100, message = "Modelo deve ter no máximo 100 caracteres")
        String modelo,

        @Size(max = 30, message = "Cor deve ter no máximo 30 caracteres")
        String cor,
        String observacoes,
        Integer status
) {}
