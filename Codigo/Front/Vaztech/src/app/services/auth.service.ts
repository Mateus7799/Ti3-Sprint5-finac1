import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, PerfisAuth } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  apiRoute = 'api/auth/login';

  public get isAuthenticated(): boolean {
    const auth: AuthResponse = JSON.parse(sessionStorage.getItem('auth') ?? '{}');
    return !!auth.token;
  }

  public get perfil(): PerfisAuth {
    const auth: AuthResponse = JSON.parse(sessionStorage.getItem('auth') ?? '{}');
    return auth.id;
  }

  public get authToken(): string | null {
    const auth: AuthResponse = JSON.parse(sessionStorage.getItem('auth') ?? '{}');
    return auth.token ?? null;
  }

  public login(id: number, senha: string) {
    this.http
      .post<AuthResponse>(`${environment.apiURL}/${this.apiRoute}`, { id, senha })
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('auth', JSON.stringify(res));
          this.router.navigate(['hub']).catch((err) => console.log(err));
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  public deslogar() {
    sessionStorage.removeItem('auth');
    this.router.navigate(['login']);
  }

  // public teste() {
  //   this.http.get(`${environment.apiURL}/usuario`).subscribe((res) => console.log(res));
  // }
}
