package br.com.vaztech.vaztech.dto;

import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record PessoaUpdateRequestDTO(
        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String nome,

        @Size(max = 20, message = "CPF/CNPJ deve ter no máximo 20 caracteres")
        String cpfCnpj,

        LocalDate dataNascimento,

        @Size(max = 50, message = "Os dados sobre a origem da pessoa deve ter no máximo 50 caracteres")
        String origem,

        String endereco,

        @Size(max = 50, message = "Os dados sobre o contato da pessoa deve ter no máximo 50 caracteres")
        String contato,

        String observacoes
) {}