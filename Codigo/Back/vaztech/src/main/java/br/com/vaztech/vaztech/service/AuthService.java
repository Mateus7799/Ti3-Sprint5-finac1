package br.com.vaztech.vaztech.service;

import java.lang.String;
import br.com.vaztech.vaztech.dto.AuthLoginRequestDTO;
import br.com.vaztech.vaztech.dto.AuthRegisterRequestDTO;
import br.com.vaztech.vaztech.dto.AuthLoginResponseDTO;
import br.com.vaztech.vaztech.dto.AuthRegisterResponseDTO;
import br.com.vaztech.vaztech.entity.Usuario;
import br.com.vaztech.vaztech.infra.security.TokenService;
import br.com.vaztech.vaztech.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    UsuarioRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenService tokenService;

    public AuthLoginResponseDTO login(AuthLoginRequestDTO dto) throws ResponseStatusException {
        try {
            Usuario usuario = repository.findById(dto.id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado com ID: " + dto.id()));

            if (!passwordEncoder.matches(dto.senha(), usuario.getSenha())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha incorreta.");
            }

            String token = tokenService.generateToken(usuario);
            return new AuthLoginResponseDTO(usuario.getId(), token);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao fazer login: " + e.getMessage(), e);
        }
    }

    @Transactional
    public AuthRegisterResponseDTO register(AuthRegisterRequestDTO dto) throws ResponseStatusException {
        try {
            Usuario newUser = new Usuario();
            newUser.setSenha(passwordEncoder.encode(dto.senha()));

            repository.save(newUser);

            return new AuthRegisterResponseDTO(newUser.getId());
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao registrar: " + e.getMessage(), e);
        }
    }
}
