package br.com.vaztech.vaztech.controller;

import br.com.vaztech.vaztech.dto.MetodoPagamentoDTO;
import br.com.vaztech.vaztech.service.MetodoPagamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/metodo-pagamento")
@RequiredArgsConstructor
public class MetodoPagamentoController {

    @Autowired
    private MetodoPagamentoService metodoPagamentoService;

    @GetMapping
    public ResponseEntity<List<MetodoPagamentoDTO>> listarProdutoStatus() {
        List<MetodoPagamentoDTO> response = metodoPagamentoService.listarMetodosPagamento();
        return ResponseEntity.ok(response);
    }
}
