CREATE TABLE Servicos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    numero_serie_produto VARCHAR(50) NOT NULL,
    tipo INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    id_cliente INT NULL,
    data_inicio DATE NULL,
    data_fim DATE NULL,
    observacoes VARCHAR(MAX) NULL,

CONSTRAINT fk_Servicos_Produtos FOREIGN KEY (numero_serie_produto)
    REFERENCES Produtos(numero_serie)
    ON UPDATE CASCADE
    ON DELETE NO ACTION,

CONSTRAINT fk_Servicos_Pessoas FOREIGN KEY (id_cliente)
    REFERENCES Pessoas(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);