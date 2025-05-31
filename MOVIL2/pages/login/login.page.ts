import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

// Ionic components
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonLabel,
  IonButton,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login.page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Ionic standalone components
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonText
  ],
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  form: FormGroup;
  auth = inject(AuthService);
  error = signal<string>('');

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.error.set('');
    });
  }

  login(): void {
    const { email, password } = this.form.value;
    console.log('Email:', email);

    this.auth.login(email, password).subscribe({
      next: () => {
        console.log('✅ Login success');
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.error.set('Email o contraseña inválidos');
      },
    });
  }
}
