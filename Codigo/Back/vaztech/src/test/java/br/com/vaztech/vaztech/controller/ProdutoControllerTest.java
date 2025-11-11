package br.com.vaztech.vaztech.controller;

//import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.ArgumentMatchers.any;
        import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

//@WebMvcTest(ProdutoController.class)
class ProdutoControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private ProdutoService produtoService;
//
//    @Test
//    void testListarEstoque_SemParametros_RetornaPrimeiraPaginaComTamanhopadrao() throws Exception {
//        // Arrange
//        EstoqueResponseDTO.EstoqueItemDTO item1 = new EstoqueResponseDTO.EstoqueItemDTO(
//            1, "SN12345", "Galaxy S21", "Smartphone", 150000,
//            "Tela trincada", 1, LocalDate.of(2024, 9, 15),
//            "Cliente reportou queda", "Em reparo", "Azul"
//        );
//
//        EstoqueResponseDTO.PaginacaoMetadataDTO metadata =
//            new EstoqueResponseDTO.PaginacaoMetadataDTO(1, 1, 0, 10);
//
//        EstoqueResponseDTO response = new EstoqueResponseDTO(
//            Arrays.asList(item1), metadata
//        );
//
//        when(produtoService.listarEstoqueComPaginacao(any(Pageable.class)))
//            .thenReturn(response);
//
//        // Act & Assert
//        mockMvc.perform(get("/api/estoque"))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$.items").isArray())
//                .andExpect(jsonPath("$.items[0].id").value(1))
//                .andExpect(jsonPath("$.items[0].numeroSerie").value("SN12345"))
//                .andExpect(jsonPath("$.items[0].modelo").value("Galaxy S21"))
//                .andExpect(jsonPath("$.items[0].produto").value("Smartphone"))
//                .andExpect(jsonPath("$.items[0].custo").value(150000))
//                .andExpect(jsonPath("$.metadata.totalItems").value(1))
//                .andExpect(jsonPath("$.metadata.totalPages").value(1))
//                .andExpect(jsonPath("$.metadata.currentPage").value(0))
//                .andExpect(jsonPath("$.metadata.pageSize").value(10));
//    }
//
//    @Test
//    void testListarEstoque_ComParametros_RetornaPaginaCorreta() throws Exception {
//        // Arrange
//        EstoqueResponseDTO.EstoqueItemDTO item1 = new EstoqueResponseDTO.EstoqueItemDTO(
//            21, "SN99999", "iPhone 13", "Smartphone Apple", 200000,
//            "Bateria viciada", 2, LocalDate.of(2024, 9, 20),
//            "Troca de bateria", "Aguardando peça", "Branco"
//        );
//
//        EstoqueResponseDTO.PaginacaoMetadataDTO metadata =
//            new EstoqueResponseDTO.PaginacaoMetadataDTO(50, 3, 1, 20);
//
//        EstoqueResponseDTO response = new EstoqueResponseDTO(
//            Arrays.asList(item1), metadata
//        );
//
//        when(produtoService.listarEstoqueComPaginacao(any(Pageable.class)))
//            .thenReturn(response);
//
//        // Act & Assert
//        mockMvc.perform(get("/api/estoque")
//                .param("page", "1")
//                .param("size", "20"))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$.items[0].id").value(21))
//                .andExpect(jsonPath("$.metadata.currentPage").value(1))
//                .andExpect(jsonPath("$.metadata.pageSize").value(20));
//    }
}