ALTER TABLE Servicos
    ADD id_metodo_pagamento INT NULL;

ALTER TABLE Servicos
    ADD CONSTRAINT fk_Servicos_MetodosPagamento FOREIGN KEY (id_metodo_pagamento)
        REFERENCES MetodosPagamento(id)