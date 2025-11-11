package br.com.vaztech.vaztech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Operacoes")
public class Operacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_produto", referencedColumnName = "id", nullable = false)
    private Produto produto;

    @Column(name = "valor", nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @ManyToOne
    @JoinColumn(name = "id_pessoa", referencedColumnName = "id", nullable = false)
    private Pessoa pessoa;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", referencedColumnName = "id", nullable = false)
    private Funcionario funcionario;

    @Column(name = "tipo", nullable = false)
    private Integer tipo; // Venda = 0; Compra = 1;

    @Column(name = "observacoes")
    private String observacoes;

    @Column(name = "data_hora_transacao", updatable = false)
    private LocalDateTime dataHoraTransacao;

    @ManyToOne
    @JoinColumn(name = "id_metodo_pagamento", referencedColumnName = "id")
    private MetodoPagamento metodoPagamento;
}