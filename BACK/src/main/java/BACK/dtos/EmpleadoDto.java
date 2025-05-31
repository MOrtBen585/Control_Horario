package BACK.dtos;

import BACK.repositories.models.Equipo;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmpleadoDto {

    private Long id;

    // Datos personales
    @Size(max = 20)
    private String ccc;

    private String foto;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;

    private String calendario;

    private String password;

    private String dni;

    @Pattern(regexp = "\\d{9}", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no tiene un formato válido")
    private String email;

    @NotBlank(message = "El rol es obligatorio")
    private String rol;

    @Past(message = "La fecha de nacimiento debe estar en el pasado")
    private LocalDate fechaNacimiento;

    private String genero;

    // Datos laborales
    private String convenio;
    private String horario;
    private String tipoContrato;
    private LocalDate contratoDesde;
    private boolean indefinido;
    private String centro;
    private String puesto;
    private String politicaVacaciones;
    private String frecuenciaFirma;

    // Configuración
    private boolean notificaciones;
    private String metodoValidacion;
    private String permisosPorDefecto;
    private String permisosExtra;
    private boolean bajaIndefinida;
    private boolean activo;

    // Métodos de registro
    private boolean appMovil;
    private boolean appWeb;

    // Otros flags
    private boolean marcarInicio;
    private boolean geolocalizable;
    private boolean permitirCorreccion;
    private boolean permitirHorasExtra;

    private Equipo equipo;
}
