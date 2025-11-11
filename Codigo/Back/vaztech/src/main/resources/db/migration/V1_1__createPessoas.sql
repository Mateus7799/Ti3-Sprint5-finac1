CREATE TABLE Pessoas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
    data_nascimento DATE NULL,
    origem VARCHAR(50) NULL
);
