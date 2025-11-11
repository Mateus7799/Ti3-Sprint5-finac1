# API Endpoint - Validação de Funcionário para Edição de Operações

## Visão Geral
Este endpoint foi criado para validar a autorização de um funcionário antes da edição de uma operação. Garante que apenas funcionários válidos e ativos possam autorizar alterações em operações do sistema.

## Endpoint

```
POST /api/operacoes/validar-funcionario
```

## Autenticação
**Não requerida** - Este endpoint é público para permitir validação inicial de funcionário.

## Request

### Body (JSON)
```json
{
  "codigoFuncionario": "F001",
  "idOperacao": 123
}
```

### Parâmetros

- `codigoFuncionario` (string, obrigatório) - Código único do funcionário no sistema
- `idOperacao` (integer, opcional) - ID da operação que será editada (para contexto)

## Response

### 200 OK - Funcionário Autorizado
```json
{
  "autorizado": true,
  "mensagem": "Funcionário autorizado para editar operações",
  "codigoFuncionario": "F001"
}
```

### 401 Unauthorized - Funcionário Inválido ou Inativo
```json
{
  "autorizado": false,
  "mensagem": "Funcionário inativo. Não tem permissão para autorizar edições",
  "codigoFuncionario": "F001"
}
```

### Casos de Falha (401/403)

#### 1. Código Vazio
```json
{
  "autorizado": false,
  "mensagem": "Código de funcionário não pode estar vazio",
  "codigoFuncionario": ""
}
```

#### 2. Funcionário Não Encontrado
```json
{
  "autorizado": false,
  "mensagem": "Funcionário não encontrado no sistema",
  "codigoFuncionario": "F999"
}
```

#### 3. Funcionário Inativo
```json
{
  "autorizado": false,
  "mensagem": "Funcionário inativo. Não tem permissão para autorizar edições",
  "codigoFuncionario": "F001"
}
```

### 500 Internal Server Error
```json
{
  "autorizado": false,
  "mensagem": "Erro interno do servidor ao validar funcionário",
  "codigoFuncionario": "F001"
}
```

## Códigos de Status HTTP

- `200 OK` - Funcionário válido e autorizado
- `401 Unauthorized` - Funcionário inválido, inexistente ou inativo
- `403 Forbidden` - (Alternativa a 401) Funcionário sem permissão
- `500 Internal Server Error` - Erro no servidor

## Exemplo de Uso

### PowerShell
```powershell
$body = @{
    codigoFuncionario = "F001"
    idOperacao = 123
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8080/api/operacoes/validar-funcionario" `
    -Headers @{"Content-Type" = "application/json"} `
    -Body $body
```

### cURL
```bash
curl -X POST "http://localhost:8080/api/operacoes/validar-funcionario" \
  -H "Content-Type: application/json" \
  -d '{
    "codigoFuncionario": "F001",
    "idOperacao": 123
  }'
```

### JavaScript/TypeScript
```typescript
const request = {
  codigoFuncionario: "F001",
  idOperacao: 123
};

const response = await fetch('http://localhost:8080/api/operacoes/validar-funcionario', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(request)
});

const data = await response.json();

if (data.autorizado) {
  console.log('Funcionário autorizado, pode editar operações');
} else {
  console.log('Acesso negado:', data.mensagem);
}
```

## Fluxo de Autorização

```
Frontend (Operação)
    |
    v
Usuário clica em "Editar Operação"
    |
    v
Frontend valida o código do funcionário
    |
    v
POST /api/operacoes/validar-funcionario
    |
    v
Backend verifica se funcionário é válido e ativo
    |
    +-----> Sim: Retorna 200 { autorizado: true }
    |
    +-----> Não: Retorna 401 { autorizado: false }
    |
    v
Frontend libera ou bloqueia a edição
    |
    v
Se autorizado: Usuário pode editar operação
Se não autorizado: Bloqueia com mensagem de erro
```

