package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.Pessoa;

public record PessoaBuscarResponseDTO(
        Integer id,
        String nome,
        String cpfCnpj
) {
    public PessoaBuscarResponseDTO(Pessoa pessoa) {
        this(
                pessoa.getId(),
                pessoa.getNome(),
                pessoa.getCpfCnpj()
        );
    }
}