package br.com.vaztech.vaztech.service;

import br.com.vaztech.vaztech.dto.ServicoAddRequestDTO;
import br.com.vaztech.vaztech.dto.ServicoUpdateRequestDTO;
import br.com.vaztech.vaztech.dto.ServicoResponseDTO;
import br.com.vaztech.vaztech.entity.Servico;
import br.com.vaztech.vaztech.entity.Produto;
import br.com.vaztech.vaztech.entity.Pessoa;
import br.com.vaztech.vaztech.entity.StatusServico;
import br.com.vaztech.vaztech.repository.ServicoRepository;
import br.com.vaztech.vaztech.repository.ProdutoRepository;
import br.com.vaztech.vaztech.repository.PessoaRepository;
import br.com.vaztech.vaztech.repository.StatusServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private StatusServicoRepository statusServicoRepository;

    public Page<ServicoResponseDTO> listarServicosPaginados(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        
        return servicoRepository.findAll(pageRequest)
                .map(ServicoResponseDTO::new);
    }

    public ServicoResponseDTO buscarPorId(Integer id) throws ResponseStatusException {
        try {
            Servico servico = servicoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado com ID: " + id));
            return new ServicoResponseDTO(servico);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao buscar serviço: " + e.getMessage(), e);
        }
    }

    public ServicoResponseDTO criarServico(ServicoAddRequestDTO dto) throws ResponseStatusException {
        try {
            Produto produto = produtoRepository.findById(dto.idProduto())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado com ID: " + dto.idProduto()));

            Pessoa pessoa = new Pessoa();
            if (dto.idPessoa() != null) {
                pessoa = pessoaRepository.findById(dto.idPessoa())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada com ID: " + dto.idPessoa()));
            }

            StatusServico status = new StatusServico();
            if (dto.idStatus() != null) {
                status = statusServicoRepository.findById(dto.idStatus())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status não encontrado com ID: " + dto.idStatus()));
            }

            Servico servico = new Servico();
            servico.setProduto(produto);
            servico.setTipo(dto.tipo());
            servico.setValor(dto.valor());
            servico.setPessoa(pessoa);
            servico.setDataInicio(dto.dataInicio());
            servico.setDataFim(dto.dataFim());
            servico.setObservacoes(dto.observacoes());
            servico.setStatus(status);

            Servico servicoSalvo = servicoRepository.save(servico);

            return new ServicoResponseDTO(servicoSalvo);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar serviço: " + e.getMessage(), e);
        }
    }

    public ServicoResponseDTO atualizarServico(Integer id, ServicoUpdateRequestDTO dto) throws ResponseStatusException {
        try {
            Servico servico = servicoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço não encontrado com ID: " + id));

            if (dto.idProduto() != null) {
                Produto produto = produtoRepository.findById(dto.idProduto())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado com ID: " + dto.idProduto()));
                servico.setProduto(produto);
            }

            if (dto.tipo() != null) {
                servico.setTipo(dto.tipo());
            }
            if (dto.valor() != null) {
                servico.setValor(dto.valor());
            }
            if (dto.idPessoa() != null) {
                Pessoa pessoa = pessoaRepository.findById(dto.idPessoa())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada com ID: " + dto.idPessoa()));
                servico.setPessoa(pessoa);
            }
            if (dto.dataInicio() != null) {
                servico.setDataInicio(dto.dataInicio());
            }
            if (dto.dataFim() != null) {
                servico.setDataFim(dto.dataFim());
            }
            if (dto.observacoes() != null) {
                servico.setObservacoes(dto.observacoes());
            }
            if (dto.idStatus() != null) {
                StatusServico status = statusServicoRepository.findById(dto.idStatus())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status não encontrado com ID: " + dto.idStatus()));
                servico.setStatus(status);
            }
            Servico servicoAtualizado = servicoRepository.save(servico);

            return new ServicoResponseDTO(servicoAtualizado);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar serviço: " + e.getMessage(), e);
        }
    }
}
