package br.com.vaztech.vaztech.controller;

import br.com.vaztech.vaztech.dto.AuthLoginRequestDTO;
import br.com.vaztech.vaztech.dto.AuthRegisterRequestDTO;
import br.com.vaztech.vaztech.dto.AuthLoginResponseDTO;
import br.com.vaztech.vaztech.dto.AuthRegisterResponseDTO;
import br.com.vaztech.vaztech.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthLoginRequestDTO dto) throws ResponseStatusException{
        final AuthLoginResponseDTO login = authService.login(dto);
        return ResponseEntity.ok(login);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AuthRegisterRequestDTO dto) throws ResponseStatusException {
        final AuthRegisterResponseDTO registro = authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }
}