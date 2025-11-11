package br.com.vaztech.vaztech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "numero_serie", nullable = false)
    private String numeroSerie;

    @Column(name = "aparelho", nullable = false)
    private String aparelho;

    @Column(name = "modelo", nullable = true)
    private String modelo;

    @Column(name = "cor", nullable = true)
    private String cor;

    @Column(name = "observacoes", nullable = true)
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "id_status", referencedColumnName = "id", nullable = true)
    private StatusProduto status;
}
