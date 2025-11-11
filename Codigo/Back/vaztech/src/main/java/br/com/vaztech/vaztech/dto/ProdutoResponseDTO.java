package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.Produto;

public record ProdutoResponseDTO(
        Integer id,
        String numeroSerie,
        String aparelho,
        String modelo,
        String cor,
        String observacoes,
        String status
) {
    public ProdutoResponseDTO(Produto produto) {
        this(
                produto.getId(),
                produto.getNumeroSerie(),
                produto.getAparelho(),
                produto.getModelo(),
                produto.getCor(),
                produto.getObservacoes(),
                produto.getStatus().getNome()
        );
    }
}
