package br.com.vaztech.vaztech.repository;

import br.com.vaztech.vaztech.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico, Integer> {
}