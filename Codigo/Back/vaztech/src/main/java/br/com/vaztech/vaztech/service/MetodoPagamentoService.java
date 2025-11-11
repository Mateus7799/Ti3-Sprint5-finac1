package br.com.vaztech.vaztech.service;

import br.com.vaztech.vaztech.dto.MetodoPagamentoDTO;
import br.com.vaztech.vaztech.repository.MetodoPagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetodoPagamentoService {

    @Autowired
    private MetodoPagamentoRepository metodoPagamentoRepository;

    public List<MetodoPagamentoDTO> listarMetodosPagamento(){
        return metodoPagamentoRepository.findAll()
                .stream().map(MetodoPagamentoDTO::new).toList();
    }
}
