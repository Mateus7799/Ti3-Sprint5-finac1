package br.com.vaztech.vaztech.service;

import br.com.vaztech.vaztech.dto.*;
import br.com.vaztech.vaztech.entity.*;
import br.com.vaztech.vaztech.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class OperacaoService {

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    PessoaRepository pessoaRepository;

    @Autowired
    OperacaoRepository operacaoRepository;

    @Autowired
    ProdutoService produtoService;

    @Autowired
    MetodoPagamentoRepository metodoPagamentoRepository;

    private static final Integer VENDA = 0;
    private static final Integer COMPRA = 1;

    public Page<OperacaoResponseDTO> buscarOperacoesPaginadas(Integer tipo, Integer id, BigDecimal min, BigDecimal max, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.DESC, "dataHoraTransacao");

        return operacaoRepository.buscarOperacoesPaginadas(tipo, id, min, max, pageRequest)
                .map(OperacaoResponseDTO::new);
    }

    public ResponseEntity<?> validarFuncionarioParaEdicao(Integer id, String codigoFuncionario) {
        Operacao operacao = operacaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Operação não encontrada com ID: " + id));

        Optional<Funcionario> funcionario = funcionarioRepository.findByCodFuncionarioAndAtivo(codigoFuncionario.trim());

        if (funcionario.isEmpty()) {
            Optional<Funcionario> funcionarioInativo = funcionarioRepository.findByCodFuncionario(codigoFuncionario.trim());

            if (funcionarioInativo.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Você não possui permissão para alterar essa operação.");
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Você não possui permissão para alterar essa operação.");
            }
        }

        if(!operacao.getFuncionario().getCodFuncionario().equals(codigoFuncionario))
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT, "Você não possui permissão para alterar essa operação.");

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @Transactional
    public OperacaoResponseDTO criarOperacao(OperacaoAddRequestDTO dto) throws ResponseStatusException {
        try {
            Produto produto = produtoRepository.findByNumeroSerie(dto.numeroSerieProduto())
                    .orElse(null);

            if (produto == null) {
                if (dto.produto() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto não encontrado e dados do produto não foram enviados para criação automática.");
                }

                ProdutoResponseDTO novoProduto = produtoService.produtoAdd(dto.produto());

                produto = produtoRepository.findByNumeroSerie(dto.produto().numeroSerie())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar o produto automaticamente."));
            }

            Pessoa pessoa = pessoaRepository.findById(dto.idPessoa())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente ou fornecedor não encontrado com ID: " + dto.idPessoa()));

            Funcionario funcionario = funcionarioRepository.findById(dto.idFuncionario())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado com ID: " + dto.idFuncionario()));

            MetodoPagamento metodoPagamento = metodoPagamentoRepository.findById(dto.metodoPagamento())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Método de pagamento não encontrado com ID: " + dto.metodoPagamento()));

            Operacao operacao = new Operacao();
            operacao.setProduto(produto);
            operacao.setPessoa(pessoa);
            operacao.setFuncionario(funcionario);
            operacao.setValor(dto.valor());
            operacao.setTipo(dto.tipo());
            operacao.setObservacoes(dto.observacoes());
            operacao.setDataHoraTransacao(LocalDateTime.now());
            operacao.setMetodoPagamento(metodoPagamento);

            Operacao salva = operacaoRepository.save(operacao);

            return new OperacaoResponseDTO(salva);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar operação: " + e.getMessage(), e);
        }
    }

    @Transactional
    public ResponseEntity<?> criarOperacaoTroca(OperacaoTrocaRequestDTO dto) throws ResponseStatusException {
        try{
            Produto produtoVendido = produtoRepository.findByNumeroSerie(dto.numeroSerieProdutoVendido())
                    .orElse(null);

            if (produtoVendido == null) {
                if (dto.produtoVendido() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto vendido não encontrado e dados do produto não foram enviados para criação automática.");
                }

                ProdutoResponseDTO novoProdutoVendido = produtoService.produtoAdd(dto.produtoVendido());

                produtoVendido = produtoRepository.findByNumeroSerie(dto.produtoVendido().numeroSerie())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar o produto vendido automaticamente."));
            }


            Produto produtoRecebido = produtoRepository.findByNumeroSerie(dto.numeroSerieProdutoRecebido())
                    .orElse(null);

            if (produtoRecebido == null) {
                if (dto.produtoRecebido() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto recebido não encontrado e dados do produto não foram enviados para criação automática.");
                }

                ProdutoResponseDTO novoProdutoRecebido = produtoService.produtoAdd(dto.produtoRecebido());

                produtoRecebido = produtoRepository.findByNumeroSerie(dto.produtoRecebido().numeroSerie())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar o produto recebido automaticamente."));
            }

            Pessoa pessoa = pessoaRepository.findById(dto.idPessoa())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente ou fornecedor não encontrado com ID: " + dto.idPessoa()));

            Funcionario funcionario = funcionarioRepository.findById(dto.idFuncionario())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado com ID: " + dto.idFuncionario()));

            MetodoPagamento metodoPagamento = metodoPagamentoRepository.findById(dto.metodoPagamento())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Método de pagamento não encontrado com ID: " + dto.metodoPagamento()));

            Operacao operacaoVenda = new Operacao();

            operacaoVenda.setValor(dto.valor());
            operacaoVenda.setMetodoPagamento(metodoPagamento);
            operacaoVenda.setPessoa(pessoa);
            operacaoVenda.setFuncionario(funcionario);
            operacaoVenda.setProduto(produtoVendido);
            operacaoVenda.setDataHoraTransacao(LocalDateTime.now());
            operacaoVenda.setTipo(VENDA);

            Operacao operacaoCompra = new Operacao();

            operacaoCompra.setValor(dto.valorAbatido());
            operacaoCompra.setMetodoPagamento(metodoPagamento);
            operacaoCompra.setPessoa(pessoa);
            operacaoCompra.setFuncionario(funcionario);
            operacaoCompra.setProduto(produtoVendido);
            operacaoCompra.setDataHoraTransacao(LocalDateTime.now());
            operacaoCompra.setTipo(COMPRA);

            operacaoCompra = operacaoRepository.save(operacaoCompra);
            operacaoVenda = operacaoRepository.save(operacaoVenda);

            operacaoCompra.setObservacoes("Refernte a operacão de venda de id: " + operacaoVenda.getId());
            operacaoVenda.setObservacoes("Refernte a operacão de compra de id: " + operacaoCompra.getId());

            operacaoRepository.save(operacaoCompra);
            operacaoRepository.save(operacaoVenda);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar operação de troca: " + e.getMessage(), e);
        }
    }

    @Transactional
    public OperacaoResponseDTO atualizarOperacao(Integer id, OperacaoUpdateRequestDTO dto) throws ResponseStatusException {
        try {
            Operacao operacao = operacaoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Operação não encontrada com ID: " + id));

            if (dto.valor() != null) {
                operacao.setValor(dto.valor());
            }

            if (dto.tipo() != null) {
                operacao.setTipo(dto.tipo());
            }

            if (dto.observacoes() != null) {
                operacao.setObservacoes(dto.observacoes());
            }

            if (dto.metodoPagamento() != null) {
                MetodoPagamento metodoPagamento = metodoPagamentoRepository.findById(dto.metodoPagamento())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Método de pagamento não encontrado com ID: " + dto.metodoPagamento()));
                operacao.setMetodoPagamento(metodoPagamento);
            }

            Operacao atualizada = operacaoRepository.save(operacao);

            return new OperacaoResponseDTO(atualizada);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar operação: " + e.getMessage(), e);
        }
    }
}
