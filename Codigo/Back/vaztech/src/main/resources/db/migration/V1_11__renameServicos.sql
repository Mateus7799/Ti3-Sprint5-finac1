ALTER TABLE Servicos DROP CONSTRAINT fk_Servicos_Produtos;
ALTER TABLE Servicos DROP CONSTRAINT fk_Servicos_Pessoas;

EXEC sp_rename 'Servicos.numero_serie_produto', 'id_produto', 'COLUMN';
EXEC sp_rename 'Servicos.id_cliente', 'id_pessoa', 'COLUMN';

ALTER TABLE Servicos
ALTER COLUMN id_produto INT NOT NULL;