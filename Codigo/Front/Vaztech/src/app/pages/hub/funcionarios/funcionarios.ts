import { Component, inject } from '@angular/core';
import { FuncionariosService } from '../../../services/funcionarios.service';
import {
  AlterarDadosPessoaisFuncionarioBody,
  CadastrarFuncionarioBody,
  FuncionarioResponse,
} from '../../../models/funcionario.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { CpfPipe } from '../../../pipes/cpf.pipe';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  imports: [
    CpfPipe,
    ToastModule,
    ScrollPanelModule,
    InputMaskModule,
    DatePickerModule,
    InputOtpModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    MessageModule,
    ButtonModule,
    FieldsetModule,
    DatePipe,
    ToolbarModule,
    AvatarModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    InputOtpModule,
    CheckboxModule,
  ],
  selector: 'app-funcionarios',
  styleUrl: './funcionarios.css',
  templateUrl: './funcionarios.html',
  providers: [MessageService],
  standalone: true,
})
export class FuncionariosComponent {
  funcionariosService = inject(FuncionariosService);
  toastService = inject(MessageService);

  funcionarios: FuncionarioResponse[] = [];

  modalFormularioFuncionarioAberto: boolean = false;
  modalMudarCodigoAberto: boolean = false;
  mudandoCodigoID: number | undefined = undefined;
  entendi: boolean = false;

  editandoFuncionario: FuncionarioResponse | undefined;

  ngOnInit() {
    this.buscarFuncionarios();
  }

  esconderMudarCodigoModal(form: NgForm) {
    this.mudandoCodigoID = undefined;
    form.resetForm();
  }

  esconderFormularioFuncionarioModal(form: NgForm) {
    this.editandoFuncionario = undefined;
    this.entendi = false;
    form.resetForm();
  }

  abrirModalMudarCodigo(id: number) {
    this.mudandoCodigoID = id;
    this.modalMudarCodigoAberto = true;
  }

  abrirModalCadastrarFuncionario() {
    this.modalFormularioFuncionarioAberto = true;
  }

  abrirModalEditarFuncionario(funcionario: FuncionarioResponse) {
    this.editandoFuncionario = funcionario;
    this.modalFormularioFuncionarioAberto = true;
  }

  enviarMudarCodigoForm(form: NgForm) {
    if (form.invalid || !this.mudandoCodigoID) return;
    console.log(
      `Mudando código do funcionário id(${this.mudandoCodigoID}) para: ${form.value.codigo}`,
    );
    this.funcionariosService
      .mudarCodigoFuncionario(this.mudandoCodigoID, form.value.codigo)
      .subscribe({
        next: () => {
          this.toastService.add({
            summary: 'Sucesso!',
            detail: 'O código do funcionário foi alterado com sucesso.',
            severity: 'success',
          });
          this.buscarFuncionarios();
        },
        error: (err) => {
          console.error(err);
          this.toastService.add({
            summary: 'Erro!',
            detail: err.error.message,
            severity: 'error',
          });
        },
      });
    this.modalMudarCodigoAberto = false;
    this.mudandoCodigoID = undefined;
    form.resetForm();
  }

  enviarFuncionarioForm(form: NgForm) {
    if (form.invalid) return;
    if (!this.editandoFuncionario) {
      const { entendi, ...funcionario } = form.value;
      this.funcionariosService
        .cadastrarFuncionario(funcionario as CadastrarFuncionarioBody)
        .subscribe({
          next: () => {
            this.toastService.add({
              summary: 'Cadastrado!',
              detail: 'O funcionário foi cadastrado com sucesso',
              severity: 'success',
            });
            this.buscarFuncionarios();
          },
          error: (err) => {
            console.error(err);
            this.toastService.add({
              summary: 'Erro!',
              detail: err.error.message,
              severity: 'error',
            });
          },
        });
      this.modalFormularioFuncionarioAberto = false;
      this.entendi = false;
      form.resetForm();
      return;
    }
    // estou editando um funcionário
    const funcionario: AlterarDadosPessoaisFuncionarioBody = {
      id: this.editandoFuncionario!.id,
      nome: form.value.nome,
      dataNascimento: form.value.dataNascimento,
      cpf: form.value.cpf,
    };
    this.funcionariosService.editarFuncionario(funcionario).subscribe({
      next: () => {
        this.toastService.add({
          summary: 'Editado!',
          detail: 'O funcionário teve seus dados editados com sucesso',
          severity: 'success',
        });
        this.buscarFuncionarios();
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          summary: 'Erro!',
          detail: err.error.message,
          severity: 'error',
        });
      },
    });
    this.editandoFuncionario = undefined;
    this.modalFormularioFuncionarioAberto = false;
    this.entendi = false;
    form.resetForm();
  }

  private buscarFuncionarios() {
    this.funcionariosService.buscarFuncionarios().subscribe({
      next: (funcionarios: FuncionarioResponse[]) => {
        this.funcionarios = [...funcionarios].map((f) => {
          f.dataNascimento = new Date(f.dataNascimento);
          return f;
        });
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          summary: 'Erro ao carregar!',
          detail: err.error.message,
          severity: 'error',
        });
      },
    });
  }
}
