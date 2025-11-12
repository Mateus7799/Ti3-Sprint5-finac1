### Documento de Endpoints da API — o que cada endpoint recebe

Abaixo está o catálogo dos endpoints expostos pelos controllers do backend, com foco no que cada um recebe (parâmetros de caminho, query params e corpo JSON quando aplicável). Para endpoints com payload JSON, o Content-Type esperado é `application/json`.

Observação: onde anotações indicam obrigatoriedade (`@NotBlank`, `@NotNull`, `@DecimalMin` etc.), sinalizo como “obrigatório”. Em alguns DTOs há `@NotBlank` aplicado a tipos não-String; interpretei como “obrigatório”.

---

#### Autenticação (`/api/auth`)

- POST `/api/auth/login`
    - Body (`AuthLoginRequestDTO`):
      ```json
      {
        "id": 123,            // inteiro, obrigatório
        "senha": "string"    // obrigatório
      }
      ```

- POST `/api/auth/register`
    - Body (`AuthRegisterRequestDTO`):
      ```json
      {
        "senha": "string"    // obrigatório
      }
      ```

---

#### Usuário (`/api/usuario`)

- GET `/api/usuario`
    - Não recebe parâmetros nem corpo.

---

#### Funcionário (`/api/funcionario`)

- GET `/api/funcionario/buscar`
    - Query params:
        - `query` (string) — obrigatório

- GET `/api/funcionario`
    - Sem parâmetros; não recebe corpo.

- GET `/api/funcionario/{id}`
    - Path params:
        - `id` (inteiro) — obrigatório

- POST `/api/funcionario`
    - Body (`FuncionarioAddRequestDTO`):
      ```json
      {
        "codFuncionario": "string",  // obrigatório, máx 50
        "nome": "string",            // obrigatório, máx 100
        "cpf": "string",             // obrigatório, máx 20
        "dataNascimento": "YYYY-MM-DD" // obrigatório (LocalDate)
      }
      ```

- PUT `/api/funcionario/{id}`
    - Path params:
        - `id` (inteiro) — obrigatório
    - Body (`FuncionarioUpdateRequestDTO`) — todos opcionais:
      ```json
      {
        "codFuncionario": "string", // máx 50
        "nome": "string",           // máx 100
        "cpf": "string",            // máx 20
        "dataNascimento": "YYYY-MM-DD",
        "status": 0                  // 0 (inativo) ou 1 (ativo)
      }
      ```

---

#### Pessoa (`/api/pessoa`)

- GET `/api/pessoa/buscar`
    - Query params:
        - `query` (string) — obrigatório

- GET `/api/pessoa/listar`
    - Query params:
        - `searchTerm` (string) — opcional
        - `page` (inteiro) — obrigatório
        - `size` (inteiro) — obrigatório

- POST `/api/pessoa`
    - Body (`PessoaAddRequestDTO`):
      ```json
      {
        "nome": "string",        // obrigatório, máx 100
        "cpfCnpj": "string",     // obrigatório, máx 20
        "dataNascimento": "YYYY-MM-DD", // opcional
        "origem": "string",      // opcional, máx 50
        "endereco": "string",    // opcional
        "contato": "string",     // opcional, máx 50
        "observacoes": "string"  // opcional
      }
      ```

- PUT `/api/pessoa/{id}`
    - Path params:
        - `id` (inteiro) — obrigatório
    - Body (`PessoaUpdateRequestDTO`) — todos opcionais:
      ```json
      {
        "nome": "string",        // máx 100
        "cpfCnpj": "string",     // máx 20
        "dataNascimento": "YYYY-MM-DD",
        "origem": "string",      // máx 50
        "endereco": "string",
        "contato": "string",     // máx 50
        "observacoes": "string"
      }
      ```

---

#### Produto (`/api/produto`)

- GET `/api/produto`
    - Query params:
        - `searchTerm` (string) — opcional
        - `page` (inteiro) — obrigatório
        - `size` (inteiro) — obrigatório

- GET `/api/produto/buscar`
    - Query params:
        - `query` (string) — obrigatório

- GET `/api/produto/status`
    - Sem parâmetros; não recebe corpo.

- POST `/api/produto`
    - Body (`ProdutoAddRequestDTO`):
      ```json
      {
        "numeroSerie": "string", // obrigatório, máx 50
        "aparelho": "string",    // obrigatório, máx 50
        "modelo": "string",      // opcional, máx 100
        "cor": "string",         // opcional, máx 30
        "observacoes": "string", // opcional
        "status": 1               // opcional (inteiro)
      }
      ```

- PUT `/api/produto/{id}`
    - Path params:
        - `id` (inteiro) — obrigatório
    - Body (`ProdutoUpdateRequestDTO`) — todos opcionais:
      ```json
      {
        "numeroSerie": "string", // máx 50
        "aparelho": "string",    // máx 50
        "modelo": "string",      // máx 100
        "cor": "string",         // máx 30
        "observacoes": "string",
        "status": 1
      }
      ```

---

#### Serviço (`/api/servico`)

- GET `/api/servico`
    - Query params:
        - `page` (inteiro) — opcional, padrão 0
        - `size` (inteiro) — opcional, padrão 10

- GET `/api/servico/{id}`
    - Path params:
        - `id` (inteiro) — obrigatório

- POST `/api/servico`
    - Body (`ServicoAddRequestDTO`):
      ```json
      {
        "numeroSerieProduto": "string", // opcional, máx 50
        "tipo": 1,                       // obrigatório (inteiro)
        "valor": 100.50,                 // obrigatório (> 0)
        "idPessoa": 123,                 // opcional
        "dataInicio": "YYYY-MM-DD",     // opcional
        "dataFim": "YYYY-MM-DD",        // opcional
        "observacoes": "string",        // opcional
        "idStatus": 1,                   // opcional
        "metodoPagamento": 1,            // opcional
        "produto": {                     // opcional (ProdutoAddRequestDTO)
          "numeroSerie": "string",  // obrigatório, máx 50
          "aparelho": "string",     // obrigatório, máx 50
          "modelo": "string",       // opcional, máx 100
          "cor": "string",          // opcional, máx 30
          "observacoes": "string",  // opcional
          "status": 1                 // opcional
        }
      }
      ```

- PUT `/api/servico/{id}`
    - Path params:
        - `id` (inteiro) — obrigatório
    - Body (`ServicoUpdateRequestDTO`) — todos opcionais, com validação de `valor > 0` quando presente:
      ```json
      {
        "idProduto": 456,
        "tipo": 1,
        "valor": 100.50,                // > 0, se enviado
        "idPessoa": 123,
        "dataInicio": "YYYY-MM-DD",
        "dataFim": "YYYY-MM-DD",
        "observacoes": "string",
        "idStatus": 1,
        "metodoPagamento": 1
      }
      ```

---

#### Operação (`/api/operacao`)

- GET `/api/operacao`
    - Query params:
        - `tipo` (inteiro) — obrigatório
        - `id` (inteiro) — opcional
        - `min` (decimal) — opcional
        - `max` (decimal) — opcional
        - `page` (inteiro) — obrigatório
        - `size` (inteiro) — obrigatório

- GET `/api/operacao/{id}/validar-funcionario`
    - Path params:
        - `id` (inteiro) — obrigatório
    - Query params:
        - `codigo` (string) — obrigatório (código do funcionário)

- POST `/api/operacao`
    - Body (`OperacaoAddRequestDTO`):
      ```json
      {
        "numeroSerieProduto": "string", // opcional, máx 50
        "valor": 100.50,                 // obrigatório
        "idPessoa": 123,                 // obrigatório
        "idFuncionario": 10,             // obrigatório
        "tipo": 1,                       // obrigatório
        "observacoes": "string",        // opcional
        "produto": {                     // opcional (ProdutoAddRequestDTO)
          "numeroSerie": "string",  // obrigatório, máx 50
          "aparelho": "string",     // obrigatório, máx 50
          "modelo": "string",       // opcional, máx 100
          "cor": "string",          // opcional, máx 30
          "observacoes": "string",  // opcional
          "status": 1                 // opcional
        },
        "metodoPagamento": 1             // opcional
      }
      ```

- POST `/api/operacao/troca`
    - Body (`OperacaoTrocaRequestDTO`):
      ```json
      {
        "valor": 100.50,                     // obrigatório
        "valorAbatido": 50.00,               // obrigatório
        "metodoPagamento": 1,                // opcional
        "idPessoa": 123,                     // obrigatório
        "idFuncionario": 10,                 // obrigatório
        "observacoes": "string",            // opcional
        "numeroSerieProdutoVendido": "string",   // opcional, máx 50
        "numeroSerieProdutoRecebido": "string",  // opcional, máx 50
        "produtoVendido": {                  // opcional (ProdutoAddRequestDTO)
          "numeroSerie": "string",
          "aparelho": "string",
          "modelo": "string",
          "cor": "string",
          "observacoes": "string",
          "status": 1
        },
        "produtoRecebido": {                 // opcional (ProdutoAddRequestDTO)
          "numeroSerie": "string",
          "aparelho": "string",
          "modelo": "string",
          "cor": "string",
          "observacoes": "string",
          "status": 1
        }
      }
      ```

- PUT `/api/operacao/{id}`
    - Path params:
        - `id` (inteiro) — obrigatório
    - Body (`OperacaoUpdateRequestDTO`) — todos opcionais:
      ```json
      {
        "valor": 120.00,
        "tipo": 2,
        "observacoes": "string",
        "metodoPagamento": 1
      }
      ```

---

#### Método de Pagamento (`/api/metodo-pagamento`)

- GET `/api/metodo-pagamento`
    - Não recebe parâmetros nem corpo.

---

### Observações finais
- Todas as rotas `POST` e `PUT` recebem JSON no corpo conforme os DTOs descritos.
- Parâmetros de paginação (`page`, `size`) são inteiros; quando não há padrão definido no método, são obrigatórios.