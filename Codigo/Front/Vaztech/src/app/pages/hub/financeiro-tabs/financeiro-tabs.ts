import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { FinanceiroService } from '../../../services/financeiro.service';
import { ComparacaoMeses, DadosFinanceirosMes } from '../../../models/financeiro.model';

@Component({
  selector: 'app-financeiro-tabs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    SelectModule,
    ToastModule,
    DividerModule,
    ProgressSpinnerModule,
    CurrencyPipe,
  ],
  templateUrl: './financeiro-tabs.html',
  providers: [MessageService],
})
export class FinanceiroTabsComponent implements OnInit {
  financeiroService = inject(FinanceiroService);
  toastService = inject(MessageService);

  dadosMesAtual: DadosFinanceirosMes | null = null;
  dadosComparacao: ComparacaoMeses | null = null;

  modalSeletorMesAberto: boolean = false;
  modalComparacaoAberto: boolean = false;

  anoSelecionado: number | null = null;
  mesSelecionado: number | null = null;

  comparacao = {
    ano1: null as number | null,
    mes1: null as number | null,
    ano2: null as number | null,
    mes2: null as number | null,
  };

  anosDisponiveis: number[] = [];
  mesesDisponiveis = [
    { nome: 'Janeiro', valor: 1 },
    { nome: 'Fevereiro', valor: 2 },
    { nome: 'Março', valor: 3 },
    { nome: 'Abril', valor: 4 },
    { nome: 'Maio', valor: 5 },
    { nome: 'Junho', valor: 6 },
    { nome: 'Julho', valor: 7 },
    { nome: 'Agosto', valor: 8 },
    { nome: 'Setembro', valor: 9 },
    { nome: 'Outubro', valor: 10 },
    { nome: 'Novembro', valor: 11 },
    { nome: 'Dezembro', valor: 12 },
  ];

  ngOnInit(): void {
    this.inicializarAnos();
    this.carregarMesAtual();
  }

  inicializarAnos(): void {
    const anoAtual = new Date().getFullYear();
    this.anosDisponiveis = [];
    for (let i = anoAtual; i >= anoAtual - 5; i--) {
      this.anosDisponiveis.push(i);
    }
  }

  carregarMesAtual(): void {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    this.financeiroService.buscarDadosMes(anoAtual, mesAtual).subscribe({
      next: (dados) => {
        this.dadosMesAtual = dados;
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Erro ao carregar dados',
          detail: 'Não foi possível carregar os dados financeiros do mês atual.',
        });
      },
    });
  }

  abrirSeletorMes(): void {
    const dataAtual = new Date();
    this.anoSelecionado = dataAtual.getFullYear();
    this.mesSelecionado = dataAtual.getMonth() + 1;
    this.modalSeletorMesAberto = true;
  }

  confirmarSelecaoMes(): void {
    if (!this.anoSelecionado || !this.mesSelecionado) return;

    this.financeiroService.buscarDadosMes(this.anoSelecionado, this.mesSelecionado).subscribe({
      next: (dados) => {
        this.dadosMesAtual = dados;
        this.modalSeletorMesAberto = false;
        this.toastService.add({
          severity: 'success',
          summary: 'Mês alterado',
          detail: `Exibindo dados de ${this.getNomeMes(this.mesSelecionado!)}/${this.anoSelecionado}`,
        });
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Erro ao carregar dados',
          detail: 'Não foi possível carregar os dados do mês selecionado.',
        });
      },
    });
  }

  abrirModalComparacao(): void {
    this.comparacao = {
      ano1: null,
      mes1: null,
      ano2: null,
      mes2: null,
    };
    this.dadosComparacao = null;
    this.modalComparacaoAberto = true;
  }

  realizarComparacao(): void {
    if (
      !this.comparacao.ano1 ||
      !this.comparacao.mes1 ||
      !this.comparacao.ano2 ||
      !this.comparacao.mes2
    ) {
      return;
    }

    if (
      this.comparacao.ano1 === this.comparacao.ano2 &&
      this.comparacao.mes1 === this.comparacao.mes2
    ) {
      this.toastService.add({
        severity: 'warn',
        summary: 'Meses iguais',
        detail: 'Selecione meses diferentes para comparação.',
      });
      return;
    }

    this.financeiroService.buscarDadosMes(this.comparacao.ano1, this.comparacao.mes1).subscribe({
      next: (dados1) => {
        this.financeiroService
          .buscarDadosMes(this.comparacao.ano2!, this.comparacao.mes2!)
          .subscribe({
            next: (dados2) => {
              this.dadosComparacao = this.calcularComparacao(dados1, dados2);
            },
            error: (err) => {
              console.error(err);
              this.toastService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Não foi possível carregar os dados do segundo mês.',
              });
            },
          });
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os dados do primeiro mês.',
        });
      },
    });
  }

  calcularComparacao(dados1: DadosFinanceirosMes, dados2: DadosFinanceirosMes): ComparacaoMeses {
    const calcularPercentual = (base: number, comparacao: number): number => {
      if (base === 0) return comparacao > 0 ? 100 : 0;
      return ((comparacao - base) / base) * 100;
    };

    return {
      mes1: dados1,
      mes2: dados2,
      diferencaPercentual: {
        faturamento: calcularPercentual(dados1.faturamento, dados2.faturamento),
        custo: calcularPercentual(dados1.custo, dados2.custo),
        lucro: calcularPercentual(dados1.lucro, dados2.lucro),
      },
    };
  }

  fecharModalComparacao(): void {
    this.modalComparacaoAberto = false;
    this.dadosComparacao = null;
  }

  getNomeMes(mes: number): string {
    return this.mesesDisponiveis.find((m) => m.valor === mes)?.nome || '';
  }
}