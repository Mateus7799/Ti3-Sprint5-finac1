import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {
  AdicionarServicoDTO,
  PessoaServico,
  ProdutoServico,
  Servico,
  TiposServico,
} from '../../../../models/servico.model';
import { FormaPagamento } from '../../../../models/forma-pagamento.model';
import { TextareaModule } from 'primeng/textarea';
import { OperacoesService } from '../../../../services/operacoes.service';
import { PessoaOperacao, ProdutoOperacao } from '../../../../models/operacao.model';
import { UtilsService } from '../../../../services/utils.service';
import { Produto } from '../../../../models/produto.model';
import { ServicosService } from '../../../../services/servicos.service';
import { MessageService } from 'primeng/api';

type TipoServicoOpcao = {
  label: string;
  value: 0 | 1 | 2;
};

@Component({
  selector: 'app-formulario-servicos',
  imports: [
    FormsModule,
    ButtonModule,
    InputIconModule,
    InputTextModule,
    InputNumberModule,
    IftaLabelModule,
    SelectModule,
    AutoCompleteModule,
    FloatLabelModule,
    ToggleButtonModule,
    MessageModule,
    TextareaModule,
    ToastModule,
    FieldsetModule,
    IconFieldModule,
  ],
  styleUrl: './formulario-servicos.css',
  templateUrl: './formulario-servicos.html',
})
export class FormularioServicos implements OnInit {
  operacoesService = inject(OperacoesService);
  toastService = inject(MessageService);
  servicoService = inject(ServicosService);
  utilsService = inject(UtilsService);

  @Input() servicoEdicao!: Servico;
  @Output() fecharAba = new EventEmitter();

  opcoesTipoServico: TipoServicoOpcao[] = [
    {
      label: 'Serviço Externo',
      value: TiposServico.EXTERNO,
    },
    {
      label: 'Serviço Interno',
      value: TiposServico.INTERNO,
    },
  ];
  tipoServicoSelecionado: TiposServico | undefined;

  cadastrarNovoProduto: boolean = false;
  formasPagamento: FormaPagamento[] = [];
  formaPagamentoSelecionada: FormaPagamento | undefined;

  pessoasDisponiveis: PessoaServico[] = [];
  produtosDisponiveis: ProdutoServico[] = [];

  ngOnInit(): void {
    this.buscarFormasPagamento();
  }

  enviarFormulario(form: NgForm) {
    if (form.invalid) return;
    if (!this.servicoEdicao) {
      this.adicionarServico(form);
      return;
    }
  }

  adicionarServico(form: NgForm) {
    let dto: AdicionarServicoDTO = {
      metodoPagamento: form.value.formaPagamento,
      valor: form.value.valor,
      idPessoa: form.value.pessoa.id,
      numeroSerieProduto: this.cadastrarNovoProduto ? null : form.value.produto.numeroSerie,
      observacoes: form.value.observacoes,
      tipo: form.value.tipo,
    };
    if (this.cadastrarNovoProduto) {
      const novoProduto: Produto = {
        numeroSerie: form.value.numeroSerieProduto,
        cor: form.value.corProduto,
        aparelho: form.value.aparelhoProduto,
        modelo: form.value.modeloProduto,
        observacoes: form.value.observacoesProduto,
      };
      dto = {
        ...dto,
        produto: novoProduto,
      };
    }
    let toastObj;
    this.servicoService.adicionarServico(dto).subscribe({
      next: () => {
        toastObj = {
          severity: 'success',
          summary: 'Operação registrada!',
          detail: `O serviço foi registrado com sucesso.`,
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

  getLabelForProduto(item: ProdutoServico) {
    return `${item.numeroSerie}: ${item.modelo}`;
  }
}
