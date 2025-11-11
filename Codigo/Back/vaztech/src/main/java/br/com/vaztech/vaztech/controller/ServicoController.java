package br.com.vaztech.vaztech.controller;

import br.com.vaztech.vaztech.dto.ServicoAddRequestDTO;
import br.com.vaztech.vaztech.dto.ServicoUpdateRequestDTO;
import br.com.vaztech.vaztech.dto.ServicoResponseDTO;
import br.com.vaztech.vaztech.service.ServicoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/servico")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public Page<ServicoResponseDTO> listarServicosPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return servicoService.listarServicosPaginados(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicoResponseDTO> buscarPorId(@PathVariable Integer id) throws ResponseStatusException {
        ServicoResponseDTO response = servicoService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ServicoResponseDTO> criarServico(@Valid @RequestBody ServicoAddRequestDTO dto) throws ResponseStatusException {
        ServicoResponseDTO response = servicoService.criarServico(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServicoResponseDTO> atualizarServico(@PathVariable Integer id, @Valid @RequestBody ServicoUpdateRequestDTO dto) throws ResponseStatusException {
        ServicoResponseDTO response = servicoService.atualizarServico(id, dto);
        return ResponseEntity.ok(response);
    }
}
