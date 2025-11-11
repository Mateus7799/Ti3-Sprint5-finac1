ALTER TABLE Operacoes
    ADD id_metodo_pagamento INT NULL;

ALTER TABLE Operacoes
    ADD CONSTRAINT fk_Operacoes_MetodosPagamento FOREIGN KEY (id_metodo_pagamento)
        REFERENCES MetodosPagamento(id)