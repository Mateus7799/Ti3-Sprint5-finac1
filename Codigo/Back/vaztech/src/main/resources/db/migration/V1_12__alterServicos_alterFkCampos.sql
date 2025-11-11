ALTER TABLE Servicos
    ADD CONSTRAINT fk_Servicos_Produtos FOREIGN KEY (id_produto)
        REFERENCES Produtos(id)
        ON UPDATE CASCADE
        ON DELETE NO ACTION;

ALTER TABLE Servicos
    ADD CONSTRAINT fk_Servicos_Pessoas FOREIGN KEY (id_pessoa)
        REFERENCES Pessoas(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL;