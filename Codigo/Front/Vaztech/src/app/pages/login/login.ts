import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [IftaLabelModule, FormsModule, SelectModule, PasswordModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  authService = inject(AuthService);

  opcoesPerfil = [
    { perfil: 'Funcionário', value: 2 },
    { perfil: 'Admin', value: 1 },
  ];

  onSubmit(form: NgForm) {
    if (form.invalid) return; // garante que o form seja válido
    console.log(form.value);

    this.authService.login(form.value.perfil, form.value.senha);
  }
}
