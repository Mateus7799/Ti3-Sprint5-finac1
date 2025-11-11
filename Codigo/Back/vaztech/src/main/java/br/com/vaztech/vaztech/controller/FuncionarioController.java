package br.com.vaztech.vaztech.controller;

import br.com.vaztech.vaztech.dto.FuncionarioAddRequestDTO;
import br.com.vaztech.vaztech.dto.FuncionarioBuscarResponseDTO;
import br.com.vaztech.vaztech.dto.FuncionarioResponseDTO;
import br.com.vaztech.vaztech.dto.FuncionarioUpdateRequestDTO;
import br.com.vaztech.vaztech.service.FuncionarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/funcionario")
@RequiredArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @GetMapping("/buscar")
    public ResponseEntity<List<FuncionarioBuscarResponseDTO>> buscarFuncionarios(@RequestParam String query) {
        return ResponseEntity.ok(funcionarioService.buscarFuncionarios(query));
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> listarFuncionarios() {
        List<FuncionarioResponseDTO> response = funcionarioService.listarFuncionarios();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDTO> listarFuncionarioUnico(@PathVariable Integer id) {
        FuncionarioResponseDTO response = funcionarioService.listarFuncionarioPorId(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> criarFuncionario(@Valid @RequestBody FuncionarioAddRequestDTO dto) throws ResponseStatusException {
        FuncionarioResponseDTO response = funcionarioService.criarFuncionario(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarFuncionario(@PathVariable Integer id, @Valid @RequestBody FuncionarioUpdateRequestDTO dto) throws ResponseStatusException {
        FuncionarioResponseDTO response = funcionarioService.atualizarFuncionario(id, dto);
        return ResponseEntity.ok(response);
    }
}
