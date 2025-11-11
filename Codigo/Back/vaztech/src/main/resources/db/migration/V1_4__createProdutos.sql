CREATE TABLE Produtos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    numero_serie VARCHAR(50) UNIQUE NOT NULL,
    aparelho VARCHAR(50) NOT NULL,
    modelo VARCHAR(100) NULL,
    cor VARCHAR(30) NULL,
    observacoes VARCHAR(MAX) NULL
);