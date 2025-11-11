package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.Funcionario;
import br.com.vaztech.vaztech.entity.Operacao;
import br.com.vaztech.vaztech.entity.Pessoa;
import br.com.vaztech.vaztech.entity.Produto;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OperacaoResponseDTO (
        Integer id,
        Produto produto,
        BigDecimal valor,
        Pessoa pessoa,
        Funcionario funcionario,
        Integer tipo,
        String observacoes,
        LocalDateTime dataHoraTransacao
) {
    public OperacaoResponseDTO(Operacao operacao) {
        this(
                operacao.getId(),
                operacao.getProduto(),
                operacao.getValor(),
                operacao.getPessoa(),
                operacao.getFuncionario(),
                operacao.getTipo(),
                operacao.getObservacoes(),
                operacao.getDataHoraTransacao()
        );
    }
}
