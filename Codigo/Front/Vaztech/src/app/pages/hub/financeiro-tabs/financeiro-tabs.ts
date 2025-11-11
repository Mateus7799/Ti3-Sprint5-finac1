import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DadosFinanceiros, FinanceiroService } from '../../../services/financeiro.service';

type MesOpcao = {
  label: string;
  value: number;
};

@Component({
  selector: 'app-financeiro-tabs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    SelectModule,
    DialogModule,
    ToastModule,
    CurrencyPipe,
  ],
  templateUrl: './financeiro-tabs.html',
  providers: [MessageService],
})
export class FinanceiroTabsComponent implements OnInit {
  financeiroService = inject(FinanceiroService);
  toastService = inject(MessageService);

  mesesDisponiveis: MesOpcao[] = [
    { label: 'Janeiro', value: 0 },
    { label: 'Fevereiro', value: 1 },
    { label: 'Março', value: 2 },
    { label: 'Abril', value: 3 },
    { label: 'Maio', value: 4 },
    { label: 'Junho', value: 5 },
    { label: 'Julho', value: 6 },
    { label: 'Agosto', value: 7 },
    { label: 'Setembro', value: 8 },
    { label: 'Outubro', value: 9 },
    { label: 'Novembro', value: 10 },
    { label: 'Dezembro', value: 11 },
  ];

  mesSelecionado: number = new Date().getMonth();
  anoAtual: number = new Date().getFullYear();

  dadosFinanceiros: DadosFinanceiros = {
    faturamento: 0,
    custo: 0,
    lucro: 0,
    mes: this.mesSelecionado,
    ano: this.anoAtual,
  };

  modalComparacaoAberto: boolean = false;
  mesComparacao1: number | null = null;
  mesComparacao2: number | null = null;
  comparacaoRealizada: boolean = false;

  dadosComparacao1: DadosFinanceiros = {
    faturamento: 0,
    custo: 0,
    lucro: 0,
    mes: 0,
    ano: this.anoAtual,
  };

  dadosComparacao2: DadosFinanceiros = {
    faturamento: 0,
    custo: 0,
    lucro: 0,
    mes: 0,
    ano: this.anoAtual,
  };

  ngOnInit(): void {
    this.carregarDadosFinanceiros();
  }

  carregarDadosFinanceiros(): void {
    this.financeiroService.buscarDadosFinanceiros(this.mesSelecionado, this.anoAtual).subscribe({
      next: (dados: DadosFinanceiros) => {
        this.dadosFinanceiros = dados;
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Erro ao carregar',
          detail: 'Não foi possível carregar os dados financeiros.',
        });
      },
    });
  }

  abrirModalComparacao(): void {
    this.modalComparacaoAberto = true;
    this.comparacaoRealizada = false;
    this.mesComparacao1 = null;
    this.mesComparacao2 = null;
  }

  fecharModalComparacao(): void {
    this.modalComparacaoAberto = false;
    this.comparacaoRealizada = false;
    this.mesComparacao1 = null;
    this.mesComparacao2 = null;
  }

  realizarComparacao(): void {
    if (
      this.mesComparacao1 === null ||
      this.mesComparacao2 === null ||
      this.mesComparacao1 === this.mesComparacao2
    ) {
      this.toastService.add({
        severity: 'warn',
        summary: 'Seleção inválida',
        detail: 'Selecione dois meses diferentes para comparar.',
      });
      return;
    }

    this.financeiroService.buscarDadosFinanceiros(this.mesComparacao1, this.anoAtual).subscribe({
      next: (dados1) => {
        this.dadosComparacao1 = dados1;

        this.financeiroService
          .buscarDadosFinanceiros(this.mesComparacao2!, this.anoAtual)
          .subscribe({
            next: (dados2) => {
              this.dadosComparacao2 = dados2;
              this.comparacaoRealizada = true;
            },
            error: (err) => {
              console.error(err);
              this.toastService.add({
                severity: 'error',
                summary: 'Erro ao comparar',
                detail: 'Não foi possível carregar os dados do segundo mês.',
              });
            },
          });
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Erro ao comparar',
          detail: 'Não foi possível carregar os dados do primeiro mês.',
        });
      },
    });
  }
}
