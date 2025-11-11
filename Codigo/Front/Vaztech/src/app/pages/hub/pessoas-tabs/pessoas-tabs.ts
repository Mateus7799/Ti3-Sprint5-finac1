import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CpfCnpjMaskDirective } from '../../../directives/cpf-cnpj-mask.directive';
import { PessoaService } from '../../../services/pessoa.service';
import {
  AlterarPessoaBody,
  CadastrarPessoaBody,
  PessoaResponse,
  PessoasReqDTO,
} from '../../../models/pessoa.model';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DatePickerModule } from 'primeng/datepicker';
import { CpfCnpjMaskPipe } from '../../../pipes/cpf-cnpj-mask.pipe';

@Component({
  selector: 'app-pessoas-tabs',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    PaginatorModule,
    ToolbarModule,
    ToastModule,
    IconFieldModule,
    InputIconModule,
    InputMaskModule,
    TextareaModule,
    SelectModule,
    CpfCnpjMaskDirective,
    CpfCnpjMaskPipe,
    AvatarModule,
    ScrollPanelModule,
    DatePickerModule,
  ],
  templateUrl: './pessoas-tabs.html',
  providers: [MessageService],
})
export class PessoasTabsComponent {
  pessoaService = inject(PessoaService);
  toastService = inject(MessageService);

  pessoas: PessoaResponse[] = [];

  modalFormularioAberto: boolean = false;
  editandoPessoa: PessoaResponse | undefined;

  paginaAtual: number = 0;
  itensPorPagina: number = 4;
  totalRegistros: number = 0;

  searchText: string = '';

  funcaoOpcoes = [
    { label: 'Cliente', value: 'Cliente' },
    { label: 'Fornecedor', value: 'Fornecedor' },
  ];

  ngOnInit() {
    this.listarPessoas();
  }

  listarPessoas(pagina?: number) {
    this.paginaAtual = pagina ?? this.paginaAtual;
    this.searchText = '';
    this.pessoaService.buscarPessoas(this.paginaAtual, this.itensPorPagina).subscribe({
      next: (pessoas: PessoasReqDTO) => {
        this.pessoas = [...pessoas.content].map((p) => {
          if (p.dataNascimento) {
            p.dataNascimento = new Date((p.dataNascimento as unknown as string) + 'T00:00:00');
          }
          return p;
        });
        this.totalRegistros = pessoas.totalElements;
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          summary: 'Erro ao carregar!',
          detail: 'Não foi possível carregar as pessoas.',
          severity: 'error',
        });
      },
    });
  }

  buscarPessoas(pagina?: number) {
    this.paginaAtual = pagina ?? this.paginaAtual;
    this.pessoaService
      .buscarPessoas(this.paginaAtual, this.itensPorPagina, this.searchText)
      .subscribe({
        next: (pessoas: PessoasReqDTO) => {
          this.pessoas = [...pessoas.content].map((p) => {
            p.dataNascimento = new Date((p.dataNascimento as unknown as string) + 'T00:00:00');
            return p;
          });
          console.log(pessoas);
          this.totalRegistros = pessoas.totalElements;
        },
        error: (err) => {
          console.error(err);
          this.toastService.add({
            summary: 'Erro ao carregar!',
            detail: 'Não foi possível carregar as pessoas.',
            severity: 'error',
          });
        },
      });
  }

  onPageChange(event: PaginatorState) {
    this.paginaAtual = event.page || 0;
    this.itensPorPagina = event.rows || 4;
    if (this.searchText.length > 0) {
      this.buscarPessoas(this.paginaAtual);
    } else {
      this.listarPessoas(this.paginaAtual);
    }
  }

  abrirModalCadastrar() {
    this.editandoPessoa = undefined;
    this.modalFormularioAberto = true;
  }

  abrirModalEditar(pessoa: PessoaResponse) {
    this.editandoPessoa = pessoa;
    console.log(pessoa.dataNascimento);
    this.modalFormularioAberto = true;
  }

  esconderFormularioModal(form: NgForm) {
    this.editandoPessoa = undefined;
    form.resetForm();
  }

  enviarFormulario(form: NgForm) {
    if (form.invalid) return;

    if (!this.editandoPessoa) {
      const cpfCnpjLimpo = form.value.cpfCnpj.replace(/\D/g, '');
      const novaPessoa: CadastrarPessoaBody = {
        nome: form.value.nome,
        cpfCnpj: cpfCnpjLimpo,
        dataNascimento: form.value.dataNascimento || null,
        origem: null,
      };

      this.pessoaService.cadastrarPessoa(novaPessoa).subscribe({
        next: () => {
          this.toastService.add({
            summary: 'Cadastrado!',
            detail: 'A pessoa foi cadastrada com sucesso',
            severity: 'success',
          });
          this.listarPessoas();
        },
        error: (err) => {
          console.error(err);
          this.toastService.add({
            summary: 'Erro!',
            detail: err.error?.erro || 'Erro ao cadastrar pessoa',
            severity: 'error',
          });
        },
      });
    } else {
      const cpfCnpjLimpo = form.value.cpfCnpj.replace(/\D/g, '');
      const pessoaAtualizada: AlterarPessoaBody = {
        id: this.editandoPessoa.id,
        nome: form.value.nome,
        cpfCnpj: cpfCnpjLimpo,
        dataNascimento: form.value.dataNascimento || null,
        origem: null,
      };

      this.pessoaService.editarPessoa(pessoaAtualizada).subscribe({
        next: () => {
          this.toastService.add({
            summary: 'Editado!',
            detail: 'A pessoa foi editada com sucesso',
            severity: 'success',
          });
          this.listarPessoas();
        },
        error: (err) => {
          console.error(err);
          this.toastService.add({
            summary: 'Erro!',
            detail: err.error?.erro || 'Erro ao editar pessoa',
            severity: 'error',
          });
        },
      });
    }

    this.modalFormularioAberto = false;
    this.editandoPessoa = undefined;
    form.resetForm();
  }
}
