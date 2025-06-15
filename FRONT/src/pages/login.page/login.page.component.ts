import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login.page',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Clase LoginPageComponent
 */
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  auth = inject(AuthService);
  error = signal<string>('');

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.error.set('');
    });
  }


  login() {
    const { email, password } = this.form.value;
    console.log('Email:', email);

    this.auth.login(email, password).subscribe({
      next: () => {
        this.auth.getRole().subscribe({
          next: (role) => {
            console.log('Role:', role.role);

            if (role.role === 'ROLE_ADMIN') {
              this.router.navigate(['/home']);
            } else if (role.role === 'ROLE_EMPLEADO') {
              this.router.navigate(['/ficha']);
            } else {
              this.router.navigate(['/unauthorized']);
            }
          },
          error: (err) => {
            console.error('Error al obtener rol:', err);
            this.error.set('Error al obtener el rol');
            this.router.navigate(['/unauthorized']);
          }
        });
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.error.set('Email o contraseña inválidos');
      }
    });
  }


}


