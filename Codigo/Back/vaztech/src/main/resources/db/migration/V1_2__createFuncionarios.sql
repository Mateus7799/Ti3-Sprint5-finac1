CREATE TABLE Funcionarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    cod_funcionario VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(20) UNIQUE NOT NULL,
    data_nascimento DATE NULL,
    status INT NOT NULL DEFAULT 1
);
