package br.com.vaztech.vaztech.controller;

import br.com.vaztech.vaztech.dto.PessoaAddRequestDTO;
import br.com.vaztech.vaztech.dto.PessoaBuscarResponseDTO;
import br.com.vaztech.vaztech.dto.PessoaResponseDTO;
import br.com.vaztech.vaztech.dto.PessoaUpdateRequestDTO;
import br.com.vaztech.vaztech.service.PessoaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/pessoa")
@RequiredArgsConstructor
public class PessoaController {

    private final PessoaService pessoaService;

    @GetMapping("/buscar")
    public ResponseEntity<List<PessoaBuscarResponseDTO>> buscarPessoas(@RequestParam String query) {
        return ResponseEntity.ok(pessoaService.buscarPessoas(query));
    }

    @GetMapping("/listar")
    public Page<PessoaResponseDTO> buscarPessoasPaginadas(@RequestParam(value = "searchTerm", required = false) String searchTerm,
                                                                @RequestParam(value = "page") int page,
                                                                @RequestParam(value = "size") int size) {
        return pessoaService.buscarPessoasPaginadas(searchTerm, page, size);
    }

    @PostMapping
    public ResponseEntity<PessoaResponseDTO> criarPessoa(@Valid @RequestBody PessoaAddRequestDTO dto) throws ResponseStatusException {
        PessoaResponseDTO response = pessoaService.criarPessoa(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PessoaResponseDTO> atualizarPessoa(@PathVariable Integer id, @Valid @RequestBody PessoaUpdateRequestDTO dto) throws ResponseStatusException {
        PessoaResponseDTO response = pessoaService.atualizarPessoa(id, dto);
        return ResponseEntity.ok(response);
    }
}
