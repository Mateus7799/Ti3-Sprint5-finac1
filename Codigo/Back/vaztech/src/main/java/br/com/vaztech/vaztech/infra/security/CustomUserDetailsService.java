package br.com.vaztech.vaztech.infra.security;

import br.com.vaztech.vaztech.entity.Usuario;
import br.com.vaztech.vaztech.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import java.util.ArrayList;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
        Usuario usuario = this.repository.findById(Integer.valueOf(userid)).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado."));
        return new org.springframework.security.core.userdetails.User(usuario.getId().toString(), usuario.getSenha(), new ArrayList<>());
    }
}
