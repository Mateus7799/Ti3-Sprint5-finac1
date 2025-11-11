package br.com.vaztech.vaztech.repository;

import br.com.vaztech.vaztech.entity.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, String> {
    Optional<Produto> findById(Integer id);
    Optional<Produto> findByNumeroSerie(String numeroSerie);
    boolean existsByNumeroSerie(String numeroSerieProduto);

    @Query("SELECT p FROM Produto p " +
            "WHERE LOWER(p.numeroSerie) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(p.aparelho) LIKE LOWER(CONCAT('%', :searchTerm, '%'))" +
            "OR LOWER(p.modelo) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Produto> buscarProdutosPaginados(@Param("searchTerm") String searchTerm, Pageable pageable);

    @Query("SELECT p FROM Produto p " +
           "WHERE LOWER(p.aparelho) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.modelo) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.numeroSerie) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Produto> findTop50ByAparelhoOrModeloOrNumeroSerieLike(@Param("query") String query);
}
