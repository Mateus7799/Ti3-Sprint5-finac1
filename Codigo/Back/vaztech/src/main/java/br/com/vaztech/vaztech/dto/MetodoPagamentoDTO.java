package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.MetodoPagamento;

public record MetodoPagamentoDTO(
        Integer id,
        String nome
){
    public MetodoPagamentoDTO(MetodoPagamento metodoPagamento) {
        this(
                metodoPagamento.getId(),
                metodoPagamento.getNome()
        );
    }
}
