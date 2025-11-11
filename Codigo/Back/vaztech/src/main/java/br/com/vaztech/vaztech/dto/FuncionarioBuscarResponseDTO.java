package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.Funcionario;

public record FuncionarioBuscarResponseDTO(
        Integer id,
        String nome
) {
    public FuncionarioBuscarResponseDTO(Funcionario funcionario) {
        this(
                funcionario.getId(),
                funcionario.getNome()
        );
    }
}