ALTER TABLE Produtos
    ADD id_status INT NULL;

ALTER TABLE Produtos
    ADD CONSTRAINT fk_Produtos_StatusProduto FOREIGN KEY (id_status)
        REFERENCES StatusProduto(id)

