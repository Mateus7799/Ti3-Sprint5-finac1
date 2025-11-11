# API Endpoints - Vaztech Backend

Este documento lista os endpoints expostos pelo backend do projeto Vaztech. Inclui método HTTP, caminho completo, corpo esperado (quando aplicável), e exemplos de uso.

Base URL (local de desenvolvimento): http://localhost:8080

---

## Autenticação

### POST http://localhost:8080/auth/login
- Descrição: Faz login de um usuário.
- Request Body (JSON):
```json
{
  "id": 123,
  "senha": "minhaSenha"
}
```
- Response 200 (JSON):
```json
{
  "token": "<jwt-token-aqui>"
}
```
- Observações: O DTO usado é `LoginRequestDTO` (campos: `id`, `senha`). O endpoint chama `AuthService.login` e retorna um `AuthResponseDTO` com o token.

---

### POST /auth/register
- Descrição: Registra um novo usuário.
- Request Body (JSON):
```json
{
  "senha": "minhaSenha"
}
```
- Response 200 (JSON):
```json
{
  "token": "<jwt-token-aqui>"
}
```
- Observações: O DTO usado é `RegisterRequestDTO` (campo: `senha`). O endpoint chama `AuthService.register`.

---

## Usuário

### GET /usuario
- Descrição: Endpoint de teste que retorna uma string de sucesso.
- Request: sem corpo.
- Response 200 (text/plain):
```
Sucesso!
```

---

## Produtos / Estoque

### POST /api/produto
- Descrição: Adiciona um produto ao estoque.
- **Autenticação**: Requerida (Bearer Token)
- Request Body (JSON):
```json
{
  "numeroSerie": "ABC123",
  "aparelho": "Smartphone",
  "modelo": "X100",
  "cor": "Preto",
  "observacoes": "Sem avarias",
  "status": 1
}
```
- Response 201 (JSON):
- O `ProdutoAddResponseDTO` atualmente está vazio (record sem campos). Verifique a implementação do `ProdutoService` para campos retornados.

---

### PUT /api/produto/{numeroSerie}
- Descrição: **✅ IMPLEMENTADO** - Atualiza um produto existente no estoque.
- **Autenticação**: Requerida (Bearer Token)
- Path Parameter:
  - `numeroSerie` (obrigatório) - Número de série do produto a ser atualizado
- Request Body (JSON) - Todos os campos são opcionais, envie apenas os que deseja atualizar:
```json
{
  "aparelho": "Smartphone",
  "modelo": "X200",
  "cor": "Azul",
  "observacoes": "Atualizado",
  "status": 2
}
```
- Response 200 (JSON):
```json
{
  "numeroSerie": "ABC123",
  "aparelho": "Smartphone",
  "modelo": "X200",
  "cor": "Azul",
  "observacoes": "Atualizado",
  "status": "Vendido"
}
```
- Erros possíveis:
  - 404: Produto não encontrado
  - 400: Status inválido
  - 401: Não autenticado

---

### GET /api/produto/status
- Descrição: Retorna a lista de status possíveis para produtos.
- Request: sem corpo.
- Response 200 (JSON array): Exemplo:
```json
[
  { "id": 1, "nome": "Em estoque" },
  { "id": 2, "nome": "Vendido" }
]
```
- DTO: `StatusProdutoDTO` (id, nome)

---

### GET /api/produto?page=0&size=10
- Descrição: **✅ IMPLEMENTADO** - Retorna o estoque paginado com lista de produtos e metadados de paginação.
- Query params:
  - `page` (opcional, default 0) - Número da página (base zero)
  - `size` (opcional, default 10) - Quantidade de itens por página
- Response 200 (JSON):
```json
{
  "items": [
    {
      "id": null,
      "numeroSerie": "ABC123",
      "modelo": "X100",
      "produto": "Smartphone",
      "custo": null,
      "descricao": null,
      "fornecedorId": null,
      "dataEntrada": null,
      "observacoes": "Sem avarias",
      "status": "Em estoque",
      "cor": "Preto"
    }
  ],
  "metadata": {
    "totalItems": 42,
    "totalPages": 5,
    "currentPage": 0,
    "pageSize": 10
  }
}
```
- DTO: `EstoqueResponseDTO` (items: list of EstoqueItemDTO, metadata: PaginacaoMetadataDTO).
- Observações:
  - A consulta é otimizada usando `Page<Produto>` do Spring Data JPA.
  - Campos `id`, `custo`, `descricao`, `fornecedorId` e `dataEntrada` retornam `null` pois não existem na tabela `Produtos` atual.
  - O campo `produto` é mapeado do campo `aparelho` da entidade.

---

## Serviços

### POST /api/servico
- Descrição: Cria um novo serviço vinculado a um produto (e opcionalmente a uma pessoa e status).
- **Autenticação**: Requerida (Bearer Token)
- Request Body (JSON):
```json
{
  "idProduto": 1,
  "tipo": 1,
  "valor": 150.00,
  "idPessoa": 2,
  "dataInicio": "2025-11-09",
  "dataFim": "2025-11-15",
  "observacoes": "Troca de tela",
  "idStatus": 1
}
```
- Response 201 (JSON):
```json
{
  "id": 10,
  "idProduto": 1,
  "produto": "iPhone",
  "tipo": 1,
  "valor": 150.00,
  "idPessoa": 2,
  "pessoa": "João Silva",
  "dataInicio": "2025-11-09",
  "dataFim": "2025-11-15",
  "observacoes": "Troca de tela",
  "idStatus": 1,
  "status": "Em andamento"
}
```
- Erros possíveis:
  - 404: Produto/Pessoa/Status não encontrado(s)
  - 400: Corpo inválido (ex.: valor não positivo)
  - 401: Não autenticado

---

### PUT /api/servico/{id}
- Descrição: Atualiza um serviço existente. Apenas os campos enviados são atualizados.
- **Autenticação**: Requerida (Bearer Token)
- Path Parameter:
  - `id` (obrigatório) - ID do serviço
- Request Body (JSON) - Todos os campos são opcionais:
```json
{
  "idProduto": 1,
  "tipo": 2,
  "valor": 200.00,
  "idPessoa": 2,
  "dataInicio": "2025-11-10",
  "dataFim": "2025-11-20",
  "observacoes": "Atualizado: troca de tela e bateria",
  "idStatus": 2
}
```
- Response 200 (JSON): Igual ao de criação, refletindo os valores atualizados.
- Erros possíveis:
  - 404: Serviço/Produto/Pessoa/Status não encontrado(s)
  - 400: Corpo inválido
  - 401: Não autenticado

---

### GET /api/servico
- Descrição: Retorna serviços de forma paginada com metadados de paginação (otimizado para grandes volumes via Spring Data JPA).
- **Autenticação**: Requerida (Bearer Token)
- Query params:
  - `page` (opcional, default 0)
  - `size` (opcional, default 10)
- Response 200 (JSON) — estrutura de `Page` do Spring:
```json
{
  "content": [
    {
      "id": 10,
      "idProduto": 5,
      "produto": "Samsung Galaxy",
      "tipo": 1,
      "valor": 250.00,
      "idPessoa": 3,
      "pessoa": "Maria Santos",
      "dataInicio": "2025-11-09",
      "dataFim": "2025-11-15",
      "observacoes": "Troca de bateria",
      "idStatus": 1,
      "status": "Em andamento"
    }
  ],
  "pageable": { "pageNumber": 0, "pageSize": 10 },
  "totalElements": 50,
  "totalPages": 5,
  "number": 0,
  "size": 10,
  "first": true,
  "last": false,
  "numberOfElements": 10,
  "empty": false
}
```
- Critérios atendidos:
  - Sem parâmetros: retorna primeira página com 10 itens (default)
  - Com `?page=2&size=20`: retorna página 2 com 20 itens
  - Sempre retorna metadados de paginação

---

### GET /api/servico/{id}
- Descrição: Busca um serviço pelo ID.
- **Autenticação**: Requerida (Bearer Token)
- Path Parameter:
  - `id` (obrigatório)
- Response 200 (JSON): Igual ao DTO de serviço mostrado acima.
- Erros possíveis:
  - 404: Serviço não encontrado
  - 401: Não autenticado

---

## Notas gerais e instruções

- Iniciar backend (a partir da pasta `Codigo/Back/vaztech`):

```powershell
# Windows PowerShell
./mvnw spring-boot:run
```

- Caso precise popular o banco, verifique os scripts Flyway em `src/main/resources/db/migration`.
- Alterar `application.properties` para configurar a conexão com o banco e porta, se necessário.
- Para testar endpoints localmente use ferramentas como `curl`, `Postman` ou `httpie`.

Exemplo com curl (login):

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"id":123,"senha":"minhaSenha"}'
```

---

Se quiser, eu posso:
- Exportar esse Markdown para PDF.
- Gerar exemplos prontos do Postman collection.
- Testar os endpoints com dados reais do banco.

## Exemplos de Teste

### Testar endpoint de estoque paginado (PowerShell):

```powershell
# Primeira página (10 itens - padrão)
Invoke-RestMethod -Method Get -Uri "http://localhost:8080/api/produto" -Headers @{ Authorization = "Bearer SEU_TOKEN_AQUI" }

# Segunda página com 20 itens
Invoke-RestMethod -Method Get -Uri "http://localhost:8080/api/produto?page=1&size=20" -Headers @{ Authorization = "Bearer SEU_TOKEN_AQUI" }

# Terceira página com 5 itens
Invoke-RestMethod -Method Get -Uri "http://localhost:8080/api/produto?page=2&size=5" -Headers @{ Authorization = "Bearer SEU_TOKEN_AQUI" }
```

### Testar endpoint de estoque paginado (curl):

```bash
# Primeira página (10 itens - padrão)
curl -X GET "http://localhost:8080/api/produto" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Segunda página com 20 itens
curl -X GET "http://localhost:8080/api/produto?page=1&size=20" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Testar endpoint de atualização de produto (PowerShell):

```powershell
# Atualizar produto (requer autenticação)
$body = @{
    aparelho = "Tablet"
    modelo = "Tab-500"
    cor = "Prata"
    observacoes = "Produto atualizado via API"
    status = 2
} | ConvertTo-Json

Invoke-RestMethod -Method Put -Uri "http://localhost:8080/api/produto/ABC123" `
    -Headers @{ Authorization = "Bearer SEU_TOKEN_AQUI"; "Content-Type" = "application/json" } `
    -Body $body
```

### Testar endpoint de atualização de produto (curl):

```bash
# Atualizar apenas alguns campos de um produto
curl -X PUT "http://localhost:8080/api/produto/ABC123" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "Vermelho",
    "observacoes": "Cor alterada",
    "status": 2
  }'
```

### Testar endpoint de atualização de produto (Insomnia/Postman):

1. **Método**: PUT
2. **URL**: `http://localhost:8080/api/produto/ABC123`
3. **Headers**:
   - `Authorization`: `Bearer SEU_TOKEN_JWT`
   - `Content-Type`: `application/json`
4. **Body** (JSON):
```json
{
  "aparelho": "Notebook",
  "modelo": "Note-2024",
  "cor": "Cinza",
  "observacoes": "Atualizado via Insomnia",
  "status": 1
}
```
5. **Resposta esperada** (200 OK):
```json
{
  "numeroSerie": "ABC123",
  "aparelho": "Notebook",
  "modelo": "Note-2024",
  "cor": "Cinza",
  "observacoes": "Atualizado via Insomnia",
  "status": "Em estoque"
}
```

