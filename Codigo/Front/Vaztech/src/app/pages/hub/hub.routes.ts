import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { PessoasTabsComponent } from './pessoas-tabs/pessoas-tabs';
import { EstoqueTabsComponent } from './estoque-tabs/estoque-tabs';
import { FinanceiroTabsComponent } from './financeiro-tabs/financeiro-tabs';
import { ServicosTabsComponent } from './servicos-tabs/servicos-tabs';
import { OperacoesTabsComponent } from './operacoes-tabs/operacoes-tabs';
import { FuncionariosComponent } from './funcionarios/funcionarios';
import { AdminRouteGuard } from '../../guards/auth.guard';

export const HubRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'pessoas', component: PessoasTabsComponent },
  { path: 'inventario', component: EstoqueTabsComponent },
  { path: 'operacoes', component: OperacoesTabsComponent },
  { path: 'financeiro', component: FinanceiroTabsComponent },
  { path: 'servicos', component: ServicosTabsComponent },
  { path: 'funcionarios', component: FuncionariosComponent, canMatch: [AdminRouteGuard] },
];
