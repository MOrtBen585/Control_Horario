import { Component, NgZone, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { FichajeService } from 'src/app/services/Fichaje.service';
import { Fichaje } from 'src/app/interfaces/Fichaje.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { Geolocation } from '@capacitor/geolocation'; // 👈 Importante

@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './fichaje.page.html',
})
export class FichajePage {
  fichajeService = inject(FichajeService);
  authService = inject(AuthService);
  router = inject(Router);

  cargando = signal<boolean>(true);
  geoError = signal<string | null>(null);
  geolocalizando = signal<boolean>(false);
  mensajeExito = signal<string>('');
  mensajeFichaje = signal<string>('');
  mensajeToast = signal<string>('');

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private zone: NgZone
  ) { }


  infoFichaje = rxResource({
    request: () => ({ id: this.authService.userId() }),
    loader: ({ request }) => {
      return this.fichajeService.getInfoParaFichar(request.id!);
    }
  })


  async fichar(tipo: 'ENTRADA' | 'SALIDA') {
    if (!this.infoFichaje.hasValue()) return;

    const datosBase = {
      empleadoId: this.infoFichaje.value()!.empleadoId,
      tipo,
      metodoRegistro: 'APP',
      geolocalizacion: this.infoFichaje.value()!.geolocalizable,
      geocercas: false,
    };

    if (this.infoFichaje.value()!.geolocalizable) {
      this.geolocalizando.set(true);

      try {
        const permission = await Geolocation.requestPermissions();
        if (permission.location !== 'granted') {
          this.geoError.set('Permiso de ubicación denegado');
          this.geolocalizando.set(false);
          return;
        }

        const position = await Geolocation.getCurrentPosition();
        this.enviarFichaje({
          ...datosBase,
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        });

      } catch (error) {
        this.geoError.set('No se pudo obtener ubicación');
        this.geolocalizando.set(false);
      }

    } else {
      this.enviarFichaje(datosBase);
    }
  }

  get entrada(): string {
    const horario = this.infoFichaje.value()?.horario;
    return horario ? horario.split('-')[0] : 'N/A';
  }

  get salida(): string {
    const horario = this.infoFichaje.value()?.horario;
    return horario ? horario.split('-')[1] : 'N/A';
  }

  private enviarFichaje(fichaje: Partial<Fichaje>) {
    console.log('Llamando a registrarFichaje con:', fichaje); // DEBUG
    this.fichajeService.registrarFichaje(fichaje).subscribe({
      next: (res) => {
        console.log('Fichaje registrado:', res); // DEBUG
        this.showToast('✅ Fichaje correcto');
        this.geolocalizando.set(false);
        this.infoFichaje.reload();
      },
      error: (err) => {
        console.error('Error al fichar:', err); // DEBUG
        this.showToast('❌ Error al fichar');
        this.geolocalizando.set(false);
      }
    });
  }


  showToast(msg: string) {
    this.mensajeToast.set(msg);
    setTimeout(() => {
      this.mensajeToast.set('');
    }, 3000);
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
