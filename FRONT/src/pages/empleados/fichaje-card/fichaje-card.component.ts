// fichaje-card.component.ts actualizado
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fichaje } from '../../../shared/interfaces/Fichaje.interface';
import { EmpleadoFichajeDto } from '../../../shared/interfaces/EmpleadoFichajeDto.interface';
import { FichajeService } from '../../../app/services/Fichaje.service';
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fichaje-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fichaje-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichajeCardComponent implements OnInit {
  info = signal<EmpleadoFichajeDto | null>(null);
  cargando = signal<boolean>(true);
  geolocalizando = false;
  errorGeo: string | null = null;
  mensajeExito: string | null = null;
  mensajeFichaje: string | null = null;

  authService = inject(AuthService);
  fichajeService = inject(FichajeService);
  router = inject(Router);


  ngOnInit(): void {
    console.log('✅ FichajeCardComponent: ngOnInit');
    console.log('✅ FichajeCardComponent: userId →', this.authService.userId());
    const empleadoId = this.authService.userId();

    if (!empleadoId) {
      console.error('❌ No se pudo determinar el empleadoId desde AuthService');
      this.cargando.set(false);
      return;
    }

    this.fichajeService.getInfoParaFichar(empleadoId).subscribe({
      next: (data) => {
        this.info.set(data);
        this.cargando.set(false);
        console.log('✅ FichajeCardComponent: info →', this.info());
      },
      error: (err) => {
        console.error('❌ Error cargando datos del empleado:', err);
        this.cargando.set(false);
      },
    });
    console.log('✅ FichajeCardComponent: getInfoParaFichar →', this.info());
  }


  fichar(tipo: 'ENTRADA' | 'SALIDA') {
    if (!this.info()) return;

    const datosBase = {
      empleadoId: this.info()!.empleadoId,
      tipo,
      metodoRegistro: 'APP',
      geolocalizacion: this.info()!.geolocalizable,
      geocercas: false,
    };

    if (this.info()!.geolocalizable && navigator.geolocation) {
      this.geolocalizando = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const fichaje: Partial<Fichaje> = {
            ...datosBase,
            latitud: pos.coords.latitude,
            longitud: pos.coords.longitude,
          };
          this.enviarFichaje(fichaje);
        },
        () => {
          this.errorGeo = 'No se pudo obtener la ubicación';
          this.geolocalizando = false;
        }
      );
    } else {
      this.enviarFichaje(datosBase);
    }
  }

  private enviarFichaje(fichaje: Partial<Fichaje>) {
    this.fichajeService.registrarFichaje(fichaje).subscribe({
      next: (res) => {
        console.log('✅ Fichaje registrado:', res);
        this.mensajeFichaje = `✅ Fichaje ${res.empleado.nombre} registrado correctamente a las ${new Date(res.fecha).toLocaleTimeString()}`;
        this.geolocalizando = false;

        // volver a cargar la info para deshabilitar botones
        this.ngOnInit();
      },
      error: (err) => {
        console.error('❌ Error al fichar:', err);
        this.mensajeFichaje = '❌ Hubo un problema al registrar el fichaje.';
        this.geolocalizando = false;
      }
    });
  }

  get entrada(): string {
    const horario = this.info()?.horario;
    return horario ? horario.split('-')[0] : 'N/A';
  }

  get salida(): string {
    const horario = this.info()?.horario;
    return horario ? horario.split('-')[1] : 'N/A';
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Error al cerrar sesión:', err);
        this.router.navigate(['/login']); // Forzar salida igual
      }
    });
  }


}
