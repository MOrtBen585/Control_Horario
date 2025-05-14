import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register.page',
  imports: [FormsModule],
  templateUrl: './register.page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  name = '';
  email = '';
  password = '';

  onSubmit() {
    // Aquí puedes agregar la lógica para el registro
    console.log('Nombre:', this.name);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
  }
}
