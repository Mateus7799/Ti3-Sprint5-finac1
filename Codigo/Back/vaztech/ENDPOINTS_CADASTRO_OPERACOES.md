# Documentação - Endpoints CRUD de Operações

--Create
POST /api/operacoes


{
  "numeroSerieProduto": "NS-12345-ABC",
  "valor": 1250.50,
  "idCliente": 1,
  "idFuncionario": 1,
  "tipo": 1,
  "observacoes": "Operação de entrada de estoque"
}

--Update
PUT /api/operacoes/{id}
{
  "numeroSerieProduto": "NS-12345-ABC-ATUALIZADO",
  "valor": 1500.00,
  "idCliente": 1,
  "idFuncionario": 1,
  "tipo": 2,
  "observacoes": "Operação de saída de estoque"
}


--Delete
DELETE /api/operacoes/{id}
