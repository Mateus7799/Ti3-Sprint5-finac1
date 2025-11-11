import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login';
import { HubComponent } from './pages/hub/hub';
import { HubRoutes } from './pages/hub/hub.routes';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'hub',
    component: HubComponent,
    canActivate: [AuthGuard],
    children: HubRoutes,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
