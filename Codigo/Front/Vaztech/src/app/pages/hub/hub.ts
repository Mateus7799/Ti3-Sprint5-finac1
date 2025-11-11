import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { PerfisAuth } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hub',
  imports: [MenuModule, PanelModule, RouterOutlet, ButtonModule],
  templateUrl: './hub.html',
  styleUrl: './hub.css',
})
export class HubComponent {
  authService = inject(AuthService);
  // qual a Label a ser mostrada, uma solução "temporária"
  selectedItem: string = 'Home';
  perfilAtual!: PerfisAuth;

  ngOnInit(): void {
    this.perfilAtual = this.authService.perfil;
  }

  deslogar() {
    this.authService.deslogar();
  }

  private commonItens: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: 'home',
      command: () => {
        this.selectedItem = 'Home';
      },
    },
    {
      label: 'Operações',
      icon: 'pi pi-shop',
      routerLink: 'operacoes',
      command: () => {
        this.selectedItem = 'Operações';
      },
    },
    {
      label: 'Inventário',
      icon: 'pi pi-box',
      routerLink: 'inventario',
      command: () => {
        this.selectedItem = 'Inventário';
      },
    },
    {
      label: 'Pessoas',
      icon: 'pi pi-users',
      routerLink: 'pessoas',
      command: () => {
        this.selectedItem = 'Pessoas';
      },
    },
    {
      label: 'Serviços',
      icon: 'pi pi-wrench',
      routerLink: 'servicos',
      command: () => {
        this.selectedItem = 'Serviços';
      },
    },
  ];

  private adminItens: MenuItem[] = [
    {
      label: 'Funcionários',
      icon: 'pi pi-briefcase',
      routerLink: 'funcionarios',
      command: () => {
        this.selectedItem = 'Funcionários';
      },
    },
    {
      label: 'Financeiro',
      icon: 'pi pi-money-bill',
      routerLink: 'financeiro',
      command: () => {
        this.selectedItem = 'Financeiro';
      },
    },
  ];

  get sidebarItens(): MenuItem[] {
    let arr = [...this.commonItens];
    if (this.perfilAtual === PerfisAuth.ADMIN) arr = [...arr, ...this.adminItens];
    return arr;
  }
}
