import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { Operacao, OperacoesReq } from '../../../models/operacao.model';
import { TabsModule } from 'primeng/tabs';
//import { FormularioOperacao } from './formulario-operacao/formulario-operacao';
import { OperacoesService } from '../../../services/operacoes.service';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-operacoes-tabs',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputOtpModule,
    ToolbarModule,
    IconFieldModule,
    FormsModule,
    InputIconModule,
    MessageModule,
    DatePipe,
    CurrencyPipe,
    MessageModule,
    ToastModule,
    CardModule,
    AvatarModule,
    TabsModule,
   // FormularioOperacao,
  ],
  templateUrl: './operacoes-tabs.html',
  styleUrl: './operacoes-tabs.css',
  providers: [MessageService],
})
export class OperacoesTabsComponent implements OnInit {
  operacoesService = inject(OperacoesService);
  toastService = inject(MessageService);

  modalCodigoAberto: boolean = false;
  operacoesCompra: Operacao[] = [];
  operacoesVenda: Operacao[] = [];
  abaAtual: number = 0;

  searchText: string = '';

  paginaAtualCompra: number = 0;
  paginaAtualVenda: number = 0;
  itensPorPaginaCompra: number = 4;
  itensPorPaginaVenda: number = 4;
  totalRegistrosCompra: number = 0;
  totalRegistrosVenda: number = 0;

  operacoesEdicao: Operacao[] = [];
  operacaoValidandoCodigo: Operacao | undefined = undefined;

  ngOnInit(): void {
    this.buscarTodasOperacoes();
  }

  abrirModalCodigo(op: Operacao) {
    this.modalCodigoAberto = true;
    this.operacaoValidandoCodigo = op;
  }

  escondeuModalCodigo(form: NgForm) {
    form.resetForm();
  }

  enviarCodigoForm(form: NgForm) {
    if (form.invalid || !this.operacaoValidandoCodigo) return;
    this.operacoesService
      .validarFuncionario(this.operacaoValidandoCodigo.id, form.value.codigo)
      .subscribe({
        next: () => {
          this.operacoesEdicao.push(structuredClone(this.operacaoValidandoCodigo) as Operacao);
          this.modalCodigoAberto = false;
          this.operacaoValidandoCodigo = undefined;
          form.resetForm();
          this.abaAtual = this.operacoesEdicao.length + 2;
        },
        error: (err) => {
          this.toastService.add({
            severity: 'error',
            summary: 'Ops! Algo deu errado',
            detail: err.error.message,
          });
          this.modalCodigoAberto = false;
          this.operacaoValidandoCodigo = undefined;
          form.resetForm();
        },
      });
  }

  buscarTodasOperacoes() {
    this.buscarOperacoesCompra();
    this.buscarOperacoesVenda();
  }

  buscarOperacoesCompra(pagina?: number) {
    this.paginaAtualCompra = pagina ?? this.paginaAtualCompra;
    this.operacoesService
      .listarOperacoes(
        'compras',
        this.paginaAtualCompra,
        this.itensPorPaginaCompra,
        this.searchText,
      )
      .subscribe({
        next: (response: OperacoesReq) => {
          this.operacoesCompra = response.content.map((o) => {
            o.dataHoraTransacao = new Date(o.dataHoraTransacao);
            return o;
          });
          this.totalRegistrosCompra = response.totalElements;
        },
      });
  }

  buscarOperacoesVenda(pagina?: number) {
    this.paginaAtualVenda = pagina ?? this.paginaAtualVenda;
    this.operacoesService
      .listarOperacoes('vendas', this.paginaAtualVenda, this.itensPorPaginaVenda, this.searchText)
      .subscribe({
        next: (response: OperacoesReq) => {
          this.operacoesVenda = response.content.map((o) => {
            o.dataHoraTransacao = new Date(o.dataHoraTransacao);
            return o;
          });
          this.totalRegistrosVenda = response.totalElements;
        },
      });
  }

  onPageChangeCompra(event: PaginatorState) {
    this.paginaAtualCompra = event.page || 0;
    this.itensPorPaginaCompra = event.rows || 4;
    if (this.searchText.length <= 0) {
      this.buscarOperacoesCompra(this.paginaAtualCompra);
    }
  }

  onPageChangeVenda(event: PaginatorState) {
    this.paginaAtualVenda = event.page || 0;
    this.itensPorPaginaVenda = event.rows || 4;
    if (this.searchText.length <= 0) {
      this.buscarOperacoesVenda(this.paginaAtualVenda);
    }
  }

  onPesquisar() {
    this.buscarTodasOperacoes();
  }

  onLimparPesquisa() {
    this.searchText = '';
    this.buscarTodasOperacoes();
  }

  irParaAdicionarOperacao() {
    this.abaAtual = 2;
  }

  fecharAba(index: number, event: { reload: boolean; toast?: any }) {
    if (index >= 0) this.operacoesEdicao.splice(index, 1);
    if (event?.reload) {
      this.buscarTodasOperacoes();
    }
    if (event?.toast) {
      this.toastService.add(event.toast);
    }
    this.abaAtual = 0;
  }
}
