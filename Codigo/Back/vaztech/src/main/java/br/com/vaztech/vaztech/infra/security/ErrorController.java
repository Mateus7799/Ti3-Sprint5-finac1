package br.com.vaztech.vaztech.infra.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

public class ErrorController {
    @RequestMapping("/error")
    public ResponseEntity<String> handleError() {
        return ResponseEntity.status(404).body("Endpoint não encontrado");
    }
}
