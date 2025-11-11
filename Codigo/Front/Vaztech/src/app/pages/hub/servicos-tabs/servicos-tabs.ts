import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormularioServicos } from './formulario-servicos/formulario-servicos';
import { MessageService } from 'primeng/api';
import { Servico, ServicosReqDTO, StatusServico } from '../../../models/servico.model';
import { ServicosService } from '../../../services/servicos.service';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { AvatarModule } from 'primeng/avatar';
import { MessageModule } from 'primeng/message';
import { FluidModule } from 'primeng/fluid';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-servicos-tabs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    FormularioServicos,
    MessageModule,
    FluidModule,
    ToastModule,
    ToolbarModule,
    IconFieldModule,
    InputTextModule,
    TabsModule,
    CardModule,
    PaginatorModule,
    FieldsetModule,
    InputIconModule,
    CurrencyPipe,
    AvatarModule,
  ],
  templateUrl: './servicos-tabs.html',
  styleUrl: './servicos-tabs.css',
  providers: [MessageService],
})
export class ServicosTabsComponent implements OnInit {
  servicoService = inject(ServicosService);
  toastService = inject(MessageService);

  statusServico: StatusServico[] = [];
  servicos: Servico[] = [];
  servicosEdit: Servico[] = [];

  abaAtual: number = 0;

  searchText: string = '';

  paginaAtual: number = 0;
  itensPorPagina: number = 6;
  totalRegistros: number = 0;

  ngOnInit(): void {
    this.buscarStatusServico();
    this.buscarServicos();
  }

  buscarServicos() {
    this.servicoService.buscarServicos().subscribe({
      next: (servicosReq: ServicosReqDTO) => {
        this.servicos = servicosReq.content;
        this.totalRegistros = servicosReq.totalElements;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  buscarStatusServico() {
    this.servicoService.listarServicosStatus().subscribe({
      next: (status: StatusServico[]) => {
        this.statusServico = status;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onPesquisar() {
    // TODO: implementar
  }

  onLimparPesquisa() {} // TODO: Implementar

  onPageChange(ev: any) {
    // TODO: mudar any
  }

  fecharAba(index: number, ev: any) {}

  get finalizadoStatusId() {
    return (
      this.statusServico.find((status) => status.nome.toLowerCase().includes('finalizado'))?.id ?? 1
    );
  }
}
