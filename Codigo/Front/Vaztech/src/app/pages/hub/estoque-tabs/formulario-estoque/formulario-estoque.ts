import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabel } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { Produto, ProdutoStatus } from '../../../../models/produto.model';
import { ProdutoService } from '../../../../services/produto.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-formulario-estoque',
  imports: [
    FormsModule,
    FieldsetModule,
    FloatLabel,
    InputTextModule,
    IftaLabel,
    DatePickerModule,
    InputNumberModule,
    SelectModule,
    ButtonModule,
    TextareaModule,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './formulario-estoque.html',
  styleUrl: './formulario-estoque.css',
})
export class FormularioEstoque implements OnInit {
  @Input() itemEdicao: Produto | undefined = undefined;
  @Input() opcoesStatus: ProdutoStatus[] = [];

  @Output() fecharAba = new EventEmitter();

  toastService = inject(MessageService);
  produtoService = inject(ProdutoService);
  statusSelecionado: number = 0;

  carregando: boolean = false;

  ngOnInit(): void {
    if (this.itemEdicao) {
      this.statusSelecionado =
        this.opcoesStatus.find((status) => status.id === this.itemEdicao!.status?.id)?.id ??
        this.statusPadrao.id;
    }
  }

  enviarFormulario(form: NgForm) {
    if (form.invalid) return;
    const item = { status: this.statusPadrao, ...(<Produto>form.value) };
    console.log(item);
    if (this.itemEdicao) {
      this.editarItem(item);
      return;
    }
    this.adicionarItem(item);
  }

  adicionarItem(item: Produto) {
    this.produtoService.adicionarProduto(item).subscribe({
      next: () => {
        console.log('Adicionado!');
        this.fecharAba.emit(true);
        this.toastService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto adicionado! 😉 ',
        });
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          severity: 'error',
          summary: 'Algo deu errado!',
          detail: `Produto não Adicionado 😭 \n${err.message}`,
        });
      },
    });
  }

  private get statusPadrao() {
    const index = this.opcoesStatus.findIndex((val) => val.nome === 'EM ESTOQUE');
    if (index < 0) return this.opcoesStatus[0];
    return this.opcoesStatus[index];
  }

  editarItem(produto: Produto) {
    this.produtoService.editarProduto(produto).subscribe({
      next: () => {
        console.log('Editado!');
        this.fecharAba.emit(true);
        this.toastService.add({
          severity: 'sucess',
          summary: 'Editado',
          detail: 'Produto editado com sucesso! 😊',
        });
      },
      error: (err: any) => {
        console.error(err);
        this.fecharAba.emit(null);
        this.toastService.add({
          severity: 'error',
          summary: 'Edição mal sucedida',
          detail: `Produto não editado 😥 \n${err.message}`,
        });
      },
    });
  }
}
