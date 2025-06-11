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
import { EmpleadoFichajeDto } from '../../../shared/interfaces/Empleado-Fichaje-Dto.interface';
import { FichajeService } from '../../../app/services/Fichaje.service';
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fichaje-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fichaje-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FichajeCardComponent {
  info = signal<EmpleadoFichajeDto | null>(null);
  cargando = signal<boolean>(true);
  geolocalizando = signal<boolean>(false);
  errorGeo = signal<string>('');
  mensajeExito = signal<string>('');
  mensajeFichaje = signal<string>('');

  authService = inject(AuthService);
  fichajeService = inject(FichajeService);
  router = inject(Router);

  infoFichaje = rxResource({
    request: () => ({
      id: this.authService.userId()
    }),
    loader: ({ request }) =>
      this.fichajeService.getInfoParaFichar(request.id!),
  });

  // ngOnInit(): void {
  //   console.log('✅ FichajeCardComponent: ngOnInit');
  //   console.log('✅ FichajeCardComponent: userId →', this.authService.userId());
  //   const empleadoId = this.authService.userId();


  //   if (!empleadoId) {
  //     console.error('❌ No se pudo determinar el empleadoId desde AuthService');
  //     this.cargando.set(false);
  //     return;
  //   }

  //   this.fichajeService.getInfoParaFichar(empleadoId).subscribe({
  //     next: (data) => {
  //       this.info.set(data);
  //       this.cargando.set(false);
  //       console.log('✅ FichajeCardComponent: info →', this.info());
  //     },
  //     error: (err) => {
  //       console.error('❌ Error cargando datos del empleado:', err);
  //       this.cargando.set(false);
  //     },
  //   });
  //   console.log('✅ FichajeCardComponent: getInfoParaFichar →', this.info());
  // }


  fichar(tipo: 'ENTRADA' | 'SALIDA') {
    if (!this.infoFichaje.hasValue()) return;

    const datosBase = {
      empleadoId: this.infoFichaje.value()!.empleadoId,
      tipo,
      metodoRegistro: 'APP',
      geolocalizacion: this.infoFichaje.value()!.geolocalizable,
      geocercas: false,
    };

    if (this.infoFichaje.value()!.geolocalizable && navigator.geolocation) {
      this.geolocalizando.set(true);
      this.errorGeo.set('');

      const startTime = Date.now(); // 🔸 tiempo de inicio

      // Timeout de seguridad de 10s
      const timeoutId = setTimeout(() => {
        clearInterval(animInterval);
        this.errorGeo.set('⏱ Tiempo de espera superado al obtener la ubicación');
        this.geolocalizando.set(false);
      }, 10000);

      // Animación de puntos
      let dots = '';
      const animInterval = setInterval(() => {
        // dots = dots.length < 3 ? dots + '.' : '';
        // this.mensajeFichaje.set(`📍 Obteniendo ubicación${dots}`);
        console.log('📍 Obteniendo ubicación');
      }, 500);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const elapsed = Date.now() - startTime;
          const delay = Math.max(0, 2000 - elapsed); // ⏳ espera restante hasta 2s

          setTimeout(() => {
            clearTimeout(timeoutId);
            clearInterval(animInterval);
            this.mensajeFichaje.set('');

            const fichaje: Partial<Fichaje> = {
              ...datosBase,
              latitud: pos.coords.latitude,
              longitud: pos.coords.longitude,
            };
            this.enviarFichaje(fichaje);
          }, delay); // ✅ aquí garantizas 2s visibles
        },
        (err) => {
          clearTimeout(timeoutId);
          clearInterval(animInterval);
          this.errorGeo.set('❌ No se pudo obtener la ubicación');
          this.geolocalizando.set(false);
        }
      );
    }

  }


  private enviarFichaje(fichaje: Partial<Fichaje>) {
    this.fichajeService.registrarFichaje(fichaje).subscribe({
      next: (res) => {
        console.log('✅ Fichaje registrado:', res);
        this.mensajeFichaje.set(`✅ Fichaje ${res.empleado.nombre} registrado correctamente a las ${new Date(res.fecha).toLocaleTimeString()}`);
        this.geolocalizando.set(false);
        this.infoFichaje.reload();

        // volver a cargar la info para deshabilitar botones
        // this.ngOnInit();
      },
      error: (err) => {
        console.error('❌ Error al fichar:', err);
        this.mensajeFichaje.set('❌ Hubo un problema al registrar el fichaje.');
        this.geolocalizando.set(false);
      }
    });
  }

  get entrada(): string {
    const horario = this.infoFichaje.value()?.horario;
    return horario ? horario.split('-')[0] : 'N/A';
  }

  get salida(): string {
    const horario = this.infoFichaje.value()?.horario;
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
