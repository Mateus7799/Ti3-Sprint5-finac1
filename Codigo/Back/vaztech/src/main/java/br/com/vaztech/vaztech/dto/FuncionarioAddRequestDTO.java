package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;


public record FuncionarioAddRequestDTO(
        @NotBlank(message = "Código do funcionário é obrigatório")
        @Size(max = 50, message = "Código do funcionário deve ter no máximo 50 caracteres")
        String codFuncionario,

        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String nome,

        @NotBlank(message = "CPF é obrigatório")
        @Size(max = 20, message = "CPF  deve ter no máximo 20 caracteres")
        String cpf,

        @NotBlank(message = "Data de nascimento é obrigatório")
        LocalDate dataNascimento
) {}