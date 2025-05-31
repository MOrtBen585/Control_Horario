import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FichajeService } from 'src/app/services/Fichaje.service';
import { EmpleadoFichajeDto } from 'src/app/interfaces/EmpleadoFichajeDto.interface';
import { Fichaje } from 'src/app/interfaces/Fichaje.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fichaje.page.html',
})
export class FichajePage implements OnInit {
  fichajeService = inject(FichajeService);
  authService = inject(AuthService);
  toastController = inject(ToastController);
  router = inject(Router);

  info = signal<EmpleadoFichajeDto | null>(null);
  cargando = signal<boolean>(true);
  geoError = signal<string | null>(null);
  geolocalizando = signal<boolean>(false);

  async ngOnInit() {
    const id = this.authService.userId();
    if (!id) return;

    this.fichajeService.getInfoParaFichar(id).subscribe({
      next: (res) => {
        this.info.set(res);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
        this.showToast('Error cargando info del empleado');
      }
    });
  }

  async fichar(tipo: 'ENTRADA' | 'SALIDA') {
    const data = this.info();
    if (!data) return;

    const baseFichaje: Partial<Fichaje> = {
      empleadoId: data.empleadoId,
      metodoRegistro: 'APP',
      geolocalizacion: data.geolocalizable,
      geocercas: false,
    };

    if (data.geolocalizable && navigator.geolocation) {
      this.geolocalizando.set(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.enviarFichaje({
            ...baseFichaje,
            latitud: pos.coords.latitude,
            longitud: pos.coords.longitude,
          });
        },
        () => {
          this.geoError.set('No se pudo obtener ubicación');
          this.geolocalizando.set(false);
        }
      );
    } else {
      this.enviarFichaje(baseFichaje);
    }
  }

  private enviarFichaje(fichaje: Partial<Fichaje>) {
    this.fichajeService.registrarFichaje(fichaje).subscribe({
      next: () => {
        this.showToast('✅ Fichaje correcto');
        this.geolocalizando.set(false);
      },
      error: () => {
        this.showToast('❌ Error al fichar');
        this.geolocalizando.set(false);
      }
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color: 'primary'
    });
    await toast.present();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error cerrando sesión:', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
