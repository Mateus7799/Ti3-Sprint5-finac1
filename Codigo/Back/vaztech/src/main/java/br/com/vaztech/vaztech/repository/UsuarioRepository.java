package br.com.vaztech.vaztech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.vaztech.vaztech.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
}
