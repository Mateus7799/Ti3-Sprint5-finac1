package br.com.vaztech.vaztech.controller;

import br.com.vaztech.vaztech.dto.*;
import br.com.vaztech.vaztech.service.OperacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/operacao")
public class OperacaoController {

    @Autowired
    private OperacaoService operacaoService;

    @GetMapping
    public Page<OperacaoResponseDTO> buscarOperacoesPaginadas(@RequestParam(value = "tipo") Integer tipo,
                                                              @RequestParam(value = "id", required = false) Integer id,
                                                              @RequestParam(value = "min", required = false) BigDecimal min,
                                                              @RequestParam(value = "max", required = false) BigDecimal max,
                                                              @RequestParam(value = "page") int page,
                                                              @RequestParam(value = "size") int size) {
        return operacaoService.buscarOperacoesPaginadas(tipo, id, min, max, page, size);
    }

    @GetMapping("/{id}/validar-funcionario")
    public ResponseEntity<?> validarFuncionario(@PathVariable Integer id, @RequestParam(value = "codigo") String codigo) {
        return operacaoService.validarFuncionarioParaEdicao(id, codigo);
    }

    @PostMapping
    public ResponseEntity<?> criarOperacao(@RequestBody OperacaoAddRequestDTO dto) throws ResponseStatusException {
        OperacaoResponseDTO response = operacaoService.criarOperacao(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/troca")
    public ResponseEntity<?> criarOperacaoTroca(@RequestBody OperacaoTrocaRequestDTO dto) {
        return operacaoService.criarOperacaoTroca(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OperacaoResponseDTO> atualizarOperacao(@PathVariable Integer id, @Valid @RequestBody OperacaoUpdateRequestDTO dto) throws ResponseStatusException {
        OperacaoResponseDTO response = operacaoService.atualizarOperacao(id, dto);
        return ResponseEntity.ok(response);
    }
}
