package br.com.vaztech.vaztech.dto;

import java.math.BigDecimal;

/**
 * Interface usada internamente pelo Spring data JPA
 * Usada para mapear os resultados da query nativa de faturamento agrupado por mês.
 */
public interface FaturamentoPorMesDTO {
    Integer getMes();
    BigDecimal getTotal();
}