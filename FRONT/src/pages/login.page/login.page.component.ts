import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login.page',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const { email, password } = this.form.value;
    if (this.auth.login(email!, password!)) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales inválidas');
    }
  }
}


