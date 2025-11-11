package br.com.vaztech.vaztech.dto;

import br.com.vaztech.vaztech.entity.Produto;

public record ProdutoBuscarResponseDTO(
        Integer id,
        String numeroSerie,
        String aparelho,
        String modelo
) {
    public ProdutoBuscarResponseDTO(Produto produto) {
        this(
                produto.getId(),
                produto.getNumeroSerie(),
                produto.getAparelho(),
                produto.getModelo()
        );
    }
}