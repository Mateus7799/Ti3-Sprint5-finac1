package br.com.vaztech.vaztech.service;

import br.com.vaztech.vaztech.dto.*;
import br.com.vaztech.vaztech.entity.Pessoa;
import br.com.vaztech.vaztech.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class PessoaService {

    @Autowired
    PessoaRepository pessoaRepository;

    public List<PessoaBuscarResponseDTO> buscarPessoas(String query) {
        return pessoaRepository.findTop50ByNomeOrCpfLike(query).stream().map(PessoaBuscarResponseDTO::new).toList();
    }

    public Page<PessoaResponseDTO> buscarPessoasPaginadas(String searchTerm, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "nome");

        if (searchTerm == null || searchTerm.isBlank()) {
            return pessoaRepository.findAll(pageRequest)
                    .map(PessoaResponseDTO::new);
        }

        return pessoaRepository.buscarPessoasPaginadas(searchTerm.toLowerCase(), pageRequest)
                .map(PessoaResponseDTO::new);
    }

    @Transactional
    public PessoaResponseDTO criarPessoa(PessoaAddRequestDTO dto) throws ResponseStatusException {
        try {
            if(pessoaRepository.existsByCpfCnpj(dto.cpfCnpj())){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF/CNPJ já cadastrado.");
            }

            Pessoa novaPessoa = new Pessoa();
            novaPessoa.setNome(dto.nome());
            novaPessoa.setCpfCnpj(dto.cpfCnpj());
            novaPessoa.setDataNascimento(dto.dataNascimento());
            novaPessoa.setOrigem(dto.origem());
            novaPessoa.setEndereco(dto.endereco());
            novaPessoa.setContato(dto.contato());
            novaPessoa.setObservacoes(dto.observacoes());

            Pessoa pessoaSalva = pessoaRepository.save(novaPessoa);

            return new PessoaResponseDTO(pessoaSalva);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao criar pessoa: " + e.getMessage(), e);
        }
    }

    @Transactional
    public PessoaResponseDTO atualizarPessoa(Integer id, PessoaUpdateRequestDTO dto) throws ResponseStatusException {
        try {
            Pessoa pessoa = pessoaRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada com ID: " + id));

            if (dto.cpfCnpj() != null && pessoaRepository.existsByCpfCnpjAndIdNot(dto.cpfCnpj(), id)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF/CNPJ já cadastrado para outra pessoa.");
            }

            if (dto.nome() != null) {
                pessoa.setNome(dto.nome());
            }
            if (dto.cpfCnpj() != null) {
                pessoa.setCpfCnpj(dto.cpfCnpj());
            }
            if (dto.dataNascimento() != null) {
                pessoa.setDataNascimento(dto.dataNascimento());
            }
            if (dto.origem() != null) {
                pessoa.setOrigem(dto.origem());
            }
            if (dto.endereco() != null) {
                pessoa.setEndereco(dto.endereco());
            }
            if (dto.contato() != null) {
                pessoa.setContato(dto.contato());
            }
            if (dto.observacoes() != null) {
                pessoa.setObservacoes(dto.observacoes());
            }

            Pessoa pessoaAtualizada = pessoaRepository.save(pessoa);

            return new PessoaResponseDTO(pessoaAtualizada);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao atualizar pessoa: " + e.getMessage(), e);
        }
    }
}
