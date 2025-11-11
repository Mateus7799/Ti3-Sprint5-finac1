package br.com.vaztech.vaztech.controller;

import br.com.vaztech.vaztech.dto.*;
import br.com.vaztech.vaztech.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public Page<ProdutoResponseDTO> buscarProdutosPaginados(@RequestParam(value = "searchTerm", required = false) String searchTerm,
                                                            @RequestParam int page,
                                                            @RequestParam int size) {
        return produtoService.listarProdutosPaginados(searchTerm, page, size);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ProdutoBuscarResponseDTO>> buscarProdutos(@RequestParam String query) {
        return ResponseEntity.ok(produtoService.buscarProdutos(query));
    }

    @GetMapping("/status")
    public ResponseEntity<List<ProdutoStatusDTO>> listarProdutoStatus() {
        List<ProdutoStatusDTO> response = produtoService.listarProdutoStatus();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criarProduto(@RequestBody ProdutoAddRequestDTO dto) throws ResponseStatusException {
        ProdutoResponseDTO response = produtoService.produtoAdd(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizarProduto(@PathVariable Integer id, @Valid @RequestBody ProdutoUpdateRequestDTO dto) throws ResponseStatusException {
        ProdutoResponseDTO response = produtoService.produtoUpdate(id, dto);
        return ResponseEntity.ok(response);
    }
}
