CREATE TABLE Operacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_produto INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    id_pessoa INT NOT NULL,
    id_funcionario INT NOT NULL,
    tipo INT NOT NULL,
    data_hora_transacao DATETIME2 DEFAULT SYSDATETIME() NOT NULL,
    observacoes VARCHAR(MAX) NULL,

CONSTRAINT fk_Operacoes_Produtos FOREIGN KEY (id_produto)
   REFERENCES Produtos(id)
   ON UPDATE CASCADE
   ON DELETE NO ACTION,

CONSTRAINT fk_Operacoes_Pessoas FOREIGN KEY (id_pessoa)
   REFERENCES Pessoas(id)
   ON UPDATE CASCADE
   ON DELETE NO ACTION,

CONSTRAINT fk_Operacoes_Funcionarios FOREIGN KEY (id_funcionario)
   REFERENCES Funcionarios(id)
   ON UPDATE CASCADE
   ON DELETE NO ACTION
);