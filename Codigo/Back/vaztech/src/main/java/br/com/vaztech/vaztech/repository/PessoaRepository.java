package br.com.vaztech.vaztech.repository;

import br.com.vaztech.vaztech.entity.Pessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
    boolean existsByCpfCnpj(String cpfCnpj);
    boolean existsByCpfCnpjAndIdNot(String cpfCnpj, Integer id);

    @Query("SELECT p FROM Pessoa p " +
           "WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR p.cpfCnpj LIKE CONCAT(:query, '%')")
    List<Pessoa> findTop50ByNomeOrCpfLike(@Param("query") String query);

    @Query("FROM Pessoa p " +
            "WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR p.cpfCnpj LIKE CONCAT(:searchTerm, '%')")
    Page<Pessoa> buscarPessoasPaginadas(@Param("searchTerm") String searchTerm, Pageable pageable);
}
