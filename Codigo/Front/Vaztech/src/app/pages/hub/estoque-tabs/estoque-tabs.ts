import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { ToolbarModule } from 'primeng/toolbar';
import { Produto, ProdutosReqDTO, ProdutoStatus } from '../../../models/produto.model';
import { FormularioEstoque } from './formulario-estoque/formulario-estoque';
import { ProdutoService } from '../../../services/produto.service';
import { CardModule } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estoque-tabs',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TabsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormularioEstoque,
    Toast,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './estoque-tabs.html',
})
export class EstoqueTabsComponent {
  abaAtual: number = 0;
  qntdProdutosTabela = 5;

  toastService = inject(MessageService);
  produtosEdicao: Produto[] = [];
  produtos: Produto[] = [];
  opcoesStatus: ProdutoStatus[] = [];

  totalProdutos: number = 0;
  paginaAtual: number = 0;

  produtoService = inject(ProdutoService);

  searchText: string = '';

  ngOnInit() {
    this.carregarProdutos(0);
    this.produtoService.buscarStatusProdutos().subscribe({
      next: (status: ProdutoStatus[]) => {
        this.opcoesStatus = status;
      },
    });
  }

  pageChange(event: TableLazyLoadEvent) {
    const first: number | undefined = (event?.first ?? 0) / (event!.rows ?? 1);
    this.qntdProdutosTabela = event?.rows ?? this.qntdProdutosTabela;
    this.carregarProdutos(first);
  }

  fecharAba(index: number, reload: boolean = false) {
    if (index >= 0) this.produtosEdicao.splice(index, 1);
    if (reload) {
      this.carregarProdutos();
    }
    this.abaAtual = 0;
  }

  onEditarProduto(produto: Produto) {
    this.produtosEdicao.push(produto);
    this.abaAtual = this.produtosEdicao.length + 1;
  }

  carregarProdutos(pagina?: number) {
    this.paginaAtual = pagina ?? this.paginaAtual;
    this.produtoService
      .buscarItens(this.paginaAtual, this.qntdProdutosTabela, this.searchText)
      .subscribe({
        next: (res: ProdutosReqDTO) => {
          this.produtos = [...res.content];
          this.totalProdutos = res.totalElements;
        },
        error: (err) => {
          console.error(err);
          this.toastService.add({
            severity: 'error',
            summary: 'Algo deu errado!',
            detail: `Produtos não carregados! 😭 \n${err.message}`,
          });
        },
      });
  }

  onLimparBusca() {
    this.searchText = '';
    this.carregarProdutos(this.paginaAtual);
  }

  irParaAdicionar() {
    this.abaAtual = 1;
  }

  getNomeStatus(id: number) {
    return this.opcoesStatus.find((val) => val.id === id)?.nome as string;
  }

  private get statusPadrao() {
    const index = this.opcoesStatus.findIndex((val) => val.nome === 'EM ESTOQUE');
    if (index < 0) return this.opcoesStatus[0];
    return this.opcoesStatus[index];
  }
}
