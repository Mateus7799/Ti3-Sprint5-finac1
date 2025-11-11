package br.com.vaztech.vaztech.repository;

import br.com.vaztech.vaztech.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import java.util.List;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {

    boolean existsByCodFuncionario(String codFuncionario);
    boolean existsByCodFuncionarioAndIdNot(String codFuncionario, Integer id);
    boolean existsByCpfAndIdNot(String cpf, Integer id);
    boolean existsByCpf(String cpf);
    
    @Query("SELECT f FROM Funcionario f WHERE f.codFuncionario = :codigo AND f.status = 1")
    Optional<Funcionario> findByCodFuncionarioAndAtivo(@Param("codigo") String codigo);
    Optional<Funcionario> findByCodFuncionario(String codFuncionario);

    @Query("SELECT f FROM Funcionario f " +
           "WHERE f.status = 1 AND (" +
           "LOWER(f.nome) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR f.cpf LIKE CONCAT('%', :query, '%'))")
    List<Funcionario> findTop50ByNomeOrCpfLikeAndAtivo(@Param("query") String query);
}
