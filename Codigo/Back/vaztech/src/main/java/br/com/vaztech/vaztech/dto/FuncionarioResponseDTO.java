package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.Funcionario;
import java.time.LocalDate;

public record FuncionarioResponseDTO(
        Integer id,
        String codFuncionario,
        String nome,
        String cpf,
        LocalDate dataNascimento,
        Integer status
) {
    public FuncionarioResponseDTO(Funcionario funcionario) {
        this(
                funcionario.getId(),
                funcionario.getCodFuncionario(),
                funcionario.getNome(),
                funcionario.getCpf(),
                funcionario.getDataNascimento(),
                funcionario.getStatus()
        );
    }
}