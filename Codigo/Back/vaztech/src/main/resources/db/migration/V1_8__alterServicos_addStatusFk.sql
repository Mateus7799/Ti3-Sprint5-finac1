ALTER TABLE Servicos
    ADD id_status INT NULL;

ALTER TABLE Servicos
    ADD CONSTRAINT fk_Servicos_StatusServico FOREIGN KEY (id_status)
        REFERENCES StatusServico(id);