package br.com.vaztech.vaztech.service;

import br.com.vaztech.vaztech.dto.FuncionarioAddRequestDTO;
import br.com.vaztech.vaztech.dto.FuncionarioBuscarResponseDTO;
import br.com.vaztech.vaztech.dto.FuncionarioResponseDTO;
import br.com.vaztech.vaztech.dto.FuncionarioUpdateRequestDTO;
import br.com.vaztech.vaztech.entity.Funcionario;
import br.com.vaztech.vaztech.entity.Usuario;
import br.com.vaztech.vaztech.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    @Autowired
    FuncionarioRepository funcionarioRepository;

    private static final Integer STATUS_ATIVO = 1;
    private static final Integer ADMIN_ID = 1;

    public List<FuncionarioResponseDTO> listarFuncionarios() {
        validarPermissaoAdmin();
        List<Funcionario> funcionarios = funcionarioRepository.findAll();

        return funcionarios.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public FuncionarioResponseDTO listarFuncionarioPorId(Integer id) {
        validarPermissaoAdmin();
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado com ID: " + id));

        return toDTO(funcionario);
    }

    public FuncionarioResponseDTO criarFuncionario(FuncionarioAddRequestDTO dto) throws ResponseStatusException {
        try {
            validarPermissaoAdmin();

            if (funcionarioRepository.existsByCodFuncionario(dto.codFuncionario())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Código de funcionário já cadastrado.");
            }

            if (funcionarioRepository.existsByCpf(dto.cpf())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado.");
            }

            Funcionario novoFuncionario = new Funcionario();
            novoFuncionario.setCodFuncionario(dto.codFuncionario());
            novoFuncionario.setNome(dto.nome());
            novoFuncionario.setCpf(dto.cpf());
            novoFuncionario.setDataNascimento(dto.dataNascimento());
            novoFuncionario.setStatus(STATUS_ATIVO);

            Funcionario funcionarioSalvo = funcionarioRepository.save(novoFuncionario);
            return new FuncionarioResponseDTO(funcionarioSalvo);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao cadastrar funcionário: " + e.getMessage(), e);
        }
    }

    public FuncionarioResponseDTO atualizarFuncionario(Integer id, FuncionarioUpdateRequestDTO dto) throws ResponseStatusException {
        try {
            validarPermissaoAdmin();
            Funcionario funcionario = funcionarioRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado com ID: " + id));

            if (dto.codFuncionario() != null) {
                boolean codJaExiste = funcionarioRepository.existsByCodFuncionarioAndIdNot(dto.codFuncionario(), id);
                if (codJaExiste) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um funcionário com o código informado.");
                }
            }

            if (dto.cpf() != null) {
                boolean cpfJaExiste = funcionarioRepository.existsByCpfAndIdNot(dto.cpf(), id);
                if (cpfJaExiste) {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um funcionário com o CPF informado.");
                }
            }

            if (dto.codFuncionario() != null) {
                funcionario.setCodFuncionario(dto.codFuncionario());
            }
            if (dto.nome() != null) {
                funcionario.setNome(dto.nome());
            }
            if (dto.cpf() != null) {
                funcionario.setCpf(dto.cpf());
            }
            if (dto.dataNascimento() != null) {
                funcionario.setDataNascimento(dto.dataNascimento());
            }
            if (dto.status() != null) {
                funcionario.setStatus(dto.status());
            }

            Funcionario funcionarioAtualizado = funcionarioRepository.save(funcionario);
            return new FuncionarioResponseDTO(funcionarioAtualizado);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao editar funcionário: " + e.getMessage(), e);
        }
    }

    public List<FuncionarioBuscarResponseDTO> buscarFuncionarios(String query) {
        return funcionarioRepository.findTop50ByNomeOrCpfLikeAndAtivo(query).stream().map(FuncionarioBuscarResponseDTO::new).toList();
    }

    private FuncionarioResponseDTO toDTO(Funcionario funcionario) {
        return new FuncionarioResponseDTO(
                funcionario.getId(),
                funcionario.getCodFuncionario(),
                funcionario.getNome(),
                funcionario.getCpf(),
                funcionario.getDataNascimento(),
                funcionario.getStatus()
        );
    }

    private void validarPermissaoAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof Usuario usuarioLogado)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado.");
        }

        if (!usuarioLogado.getId().equals(ADMIN_ID)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Acesso negado. Esta operação é restrita a administradores.");
        }
    }
}
