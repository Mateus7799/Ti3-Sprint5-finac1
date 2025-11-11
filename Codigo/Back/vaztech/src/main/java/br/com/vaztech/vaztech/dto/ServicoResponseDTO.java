package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.Servico;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ServicoResponseDTO(
        Integer id,
        Integer idProduto,
        String produto,
        Integer tipo,
        BigDecimal valor,
        Integer idPessoa,
        String pessoa,
        LocalDate dataInicio,
        LocalDate dataFim,
        String observacoes,
        Integer idStatus,
        String status
) {
    public ServicoResponseDTO(Servico servico) {
        this(
                servico.getId(),
                servico.getProduto() != null ? servico.getProduto().getId() : null,
                servico.getProduto() != null ? servico.getProduto().getAparelho() : null,
                servico.getTipo(),
                servico.getValor(),
                servico.getPessoa() != null ? servico.getPessoa().getId() : null,
                servico.getPessoa() != null ? servico.getPessoa().getNome() : null,
                servico.getDataInicio(),
                servico.getDataFim(),
                servico.getObservacoes(),
                servico.getStatus() != null ? servico.getStatus().getId() : null,
                servico.getStatus() != null ? servico.getStatus().getNome() : null
        );
    }
}
