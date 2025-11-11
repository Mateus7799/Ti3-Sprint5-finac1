package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record FuncionarioUpdateRequestDTO(
        @Size(max = 50, message = "Código do funcionário deve ter no máximo 50 caracteres")
        String codFuncionario,

        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String nome,

        @Size(max = 20, message = "CPF  deve ter no máximo 20 caracteres")
        String cpf,
        LocalDate dataNascimento,

        @Min(value = 0, message = "Status deve ser 0 (inativo) ou 1 (ativo)")
        @Max(value = 1, message = "Status deve ser 0 (inativo) ou 1 (ativo)")
        Integer status
) {}