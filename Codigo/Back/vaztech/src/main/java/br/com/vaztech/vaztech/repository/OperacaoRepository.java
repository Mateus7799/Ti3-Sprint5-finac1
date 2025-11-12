package br.com.vaztech.vaztech.repository;

import br.com.vaztech.vaztech.dto.FaturamentoPorMesDTO;
import br.com.vaztech.vaztech.entity.Operacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;

public interface OperacaoRepository extends JpaRepository<Operacao, Integer> {

    @Query("""
    FROM Operacao o
    WHERE o.tipo = :tipo
      AND (:id IS NULL OR o.id = :id)
      AND (:min IS NULL OR o.valor >= :min)
      AND (:max IS NULL OR o.valor <= :max)
    """)
    Page<Operacao> buscarOperacoesPaginadas(@Param("tipo") Integer tipo,
                                            @Param("id") Integer id,
                                            @Param("min") BigDecimal min,
                                            @Param("max") BigDecimal max,
                                            Pageable pageable);


    @Query("SELECT COALESCE(SUM(o.valor), 0.0) FROM Operacao o " +
            "WHERE o.tipo = :tipo " +
            "AND YEAR(o.dataHoraTransacao) = :ano " +
            "AND MONTH(o.dataHoraTransacao) = :mes")
    BigDecimal sumValorByTipoAndAnoAndMes(@Param("tipo") Integer tipo,
                                          @Param("ano") Integer ano,
                                          @Param("mes") Integer mes);


    @Query("SELECT MONTH(o.dataHoraTransacao) as mes, COALESCE(SUM(o.valor), 0.0) as total " +
            "FROM Operacao o " +
            "WHERE o.tipo = :tipo AND YEAR(o.dataHoraTransacao) = :ano " +
            "GROUP BY MONTH(o.dataHoraTransacao) " +
            "ORDER BY MONTH(o.dataHoraTransacao) ASC")
    List<FaturamentoPorMesDTO> findFaturamentoByAnoGroupByMes(@Param("tipo") Integer tipo, @Param("ano") Integer ano);
}