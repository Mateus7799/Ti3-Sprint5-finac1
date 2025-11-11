import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';
import {
  AdicionarOperacaoDTO,
  AdicionarOperacaoTrocaDTO,
  EditarOperacaoDTO,
  FuncionarioOperacao,
  Operacao,
  PessoaOperacao,
  ProdutoOperacao,
} from '../../../../models/operacao.model';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { OperacoesService } from '../../../../services/operacoes.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { Produto } from '../../../../models/produto.model';
import { FloatLabel } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { FormaPagamento } from '../../../../models/forma-pagamento.model';
import { UtilsService } from '../../../../services/utils.service';

type TipoOperacaoOpcao = {
  label: string;
  value: 0 | 1 | 2;
};

@Component({
  selector: 'app-formulario-operacao',
  templateUrl: './formulario-operacao.html',
  styleUrl: './formulario-operacao.css',
  imports: [
    FormsModule,
    FieldsetModule,
    RippleModule,
    ToastModule,
    FloatLabel,
    MessageModule,
    InputNumberModule,
    IftaLabelModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    AutoCompleteModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    TextareaModule,
    ScrollPanelModule,
  ],
  standalone: true,
  providers: [MessageService],
})
export class FormularioOperacao implements OnInit {
  operacoesService = inject(OperacoesService);
  toastService = inject(MessageService);
  utilsService = inject(UtilsService);

  @Input() operacaoEdicao?: Operacao;
  @Output() fecharAba = new EventEmitter();

  opcoesTipoOperacao: TipoOperacaoOpcao[] = [
    {
      label: 'Venda',
      value: 0,
    },
    {
      label: 'Compra',
      value: 1,
    },
    {
      label: 'Troca',
      value: 2,
    },
  ];

  tipoOperacaoSelecionado: 0 | 1 | 2 | undefined;
  funcionariosDisponiveis: FuncionarioOperacao[] = [];
  produtosDisponiveis: ProdutoOperacao[] = [];
  pessoasDisponiveis: PessoaOperacao[] = [];

  cadastrarNovoProduto: boolean = false;
  cadastrarNovoProdutoRecebido: boolean = false;

  formasPagamento: FormaPagamento[] = [];
  formaPagamentoSelecionada: FormaPagamento | undefined;

  ngOnInit() {
    this.buscarFormasPagamento();
    if (this.operacaoEdicao) {
      // remove operação de troca caso seja edição
      this.opcoesTipoOperacao.pop();
    }
    this.tipoOperacaoSelecionado = this.operacaoEdicao?.tipo ?? this.tipoOperacaoSelecionado;
  }

  enviarFormulario(form: NgForm) {
    if (form.invalid) {
      this.toastService.add({
        severity: 'error',
        detail: 'Não foi possível adicionar',
        summary: 'Formulário inválido!',
      });
      return;
    }
    // adicionando uma nova operação
    if (!this.operacaoEdicao) {
      if (this.estouTrocando) {
        this.cadastrarOperacaoTroca(form);
        return;
      }
      this.cadastrarOperacaoVenda(form);
      return;
    }
    if (this.tipoOperacaoSelecionado === 2) return; // só garantindo que não está tentando editar uma troca
    this.editarOperacao(form);
  }

  cadastrarOperacaoVenda(form: NgForm) {
    let toastObj;
    let novaOperacao: AdicionarOperacaoDTO = {
      valor: form.value.valor,
      formaPagamento: form.value.formaPagamento,
      idPessoa: form.value.pessoa.id,
      idFuncionario: form.value.funcionario.id,
      observacoes: form.value.observacoes,
      tipo: form.value.tipo,
      numeroSerieProduto: this.cadastrarNovoProduto ? null : form.value.produto.numeroSerie,
    };
    if (this.cadastrarNovoProduto) {
      const novoProduto: Produto = {
        numeroSerie: form.value.numeroSerieProduto,
        cor: form.value.corProduto,
        aparelho: form.value.aparelhoProduto,
        modelo: form.value.modeloProduto,
        observacoes: form.value.observacoesProduto,
      };
      novaOperacao = { ...novaOperacao, produto: novoProduto };
    }
    this.operacoesService.adicionarOperacao(novaOperacao).subscribe({
      next: () => {
        toastObj = {
          severity: 'success',
          summary: 'Operação registrada!',
          detail: `A ${this.tipoOperacaoSelecionado === 0 ? 'venda' : 'compra'} foi registrada com sucesso.`,
        };
        this.fecharAba.emit({ reload: true, toast: toastObj });
        form.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Ocorreu um erro',
          detail: err.error.message,
        });
        form.resetForm();
      },
    });
  }

  editarOperacao(form: NgForm) {
    let toastObj;
    const operacaoEditada: EditarOperacaoDTO = {
      valor: form.value.valor,
      tipo: form.value.tipo,
      observacoes: form.value.observacoes,
    };
    this.operacoesService.editarOperacao(operacaoEditada, this.operacaoEdicao!.id).subscribe({
      next: () => {
        toastObj = {
          severity: 'success',
          summary: 'Operação editada!',
          detail: `A ${this.tipoOperacaoSelecionado === 0 ? 'venda' : 'compra'} foi alterada com sucesso.`,
        };
        this.fecharAba.emit({ reload: true, toast: toastObj });
        this.operacaoEdicao = undefined;
        form.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Ocorreu um erro',
          detail: err.error.message,
        });
        this.operacaoEdicao = undefined;
        form.resetForm();
      },
    });
  }

  cadastrarOperacaoTroca(form: NgForm) {
    let toastObj;
    let novaOperacao: AdicionarOperacaoTrocaDTO = {
      valor: form.value.valor,
      formaPagamento: form.value.formaPagamento,
      idPessoa: form.value.pessoa.id,
      idFuncionario: form.value.funcionario.id,
      numeroSerieProdutoVendido: this.cadastrarNovoProduto ? null : form.value.produto.numeroSerie,
      numeroSerieProdutoRecebido: this.cadastrarNovoProdutoRecebido
        ? null
        : form.value.produtoRecebido.numeroSerie,
    };
    if (this.cadastrarNovoProduto) {
      const novoProduto: Produto = {
        numeroSerie: form.value.numeroSerieProduto,
        cor: form.value.corProduto,
        aparelho: form.value.aparelhoProduto,
        modelo: form.value.modeloProduto,
        observacoes: form.value.observacoesProduto,
      };
      novaOperacao = { ...novaOperacao, produtoVendido: novoProduto };
    }
    if (this.cadastrarNovoProdutoRecebido) {
      const novoProduto: Produto = {
        numeroSerie: form.value.numeroSerieProdutoRecebido,
        cor: form.value.corProdutoRecebido,
        aparelho: form.value.aparelhoProdutoRecebido,
        modelo: form.value.modeloProdutoRecebido,
        observacoes: form.value.observacoesProdutoRecebido,
      };
      novaOperacao = { ...novaOperacao, produtoRecebido: novoProduto };
    }
    this.operacoesService.adicionarOperacao(novaOperacao, true).subscribe({
      next: () => {
        toastObj = {
          severity: 'success',
          summary: 'Operação registrada!',
          detail: `A troca foi registrada! Para isso, foram criadas uma operação de compra e uma de venda`,
        };
        this.fecharAba.emit({ reload: true, toast: toastObj });
        form.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Ocorreu um erro',
          detail: err.error.message,
        });
        form.resetForm();
      },
    });
  }

  queryFuncionarios(busca: AutoCompleteCompleteEvent) {
    this.operacoesService.funcionariosQuery(busca.query).subscribe({
      next: (funcionarios: FuncionarioOperacao[]) => {
        this.funcionariosDisponiveis = [...funcionarios];
      },
    });
  }

  queryPessoas(busca: AutoCompleteCompleteEvent) {
    this.operacoesService.pessoasQuery(busca.query).subscribe({
      next: (pessoas: PessoaOperacao[]) => {
        this.pessoasDisponiveis = [...pessoas];
      },
    });
  }

  queryProdutos(busca: AutoCompleteCompleteEvent) {
    this.operacoesService.produtosQuery(busca.query).subscribe({
      next: (produtos: ProdutoOperacao[]) => {
        this.produtosDisponiveis = [...produtos];
      },
    });
  }

  buscarFormasPagamento() {
    this.utilsService.buscarFormasPagamento().subscribe({
      next: (fp: FormaPagamento[]) => {
        this.formasPagamento = [...fp];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getLabelForProduto(item: ProdutoOperacao) {
    return `${item.numeroSerie}: ${item.modelo}`;
  }

  get estouTrocando() {
    return this.tipoOperacaoSelecionado === 2;
  }
}
