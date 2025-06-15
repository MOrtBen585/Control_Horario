package BACK.dtos;

import java.time.LocalDate;

import BACK.repositories.models.Equipo;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class EmpleadoDto.
 */
@Getter
@Setter
public class EmpleadoDto {

    /** The id. */
    private Long id;

    /** The ccc. */
    // Datos personales
    @Size(max = 20)
    private String ccc;

    /** The foto. */
    private byte[] foto;

    /** The nombre. */
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    /** The apellidos. */
    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;

    /** The calendario id. */
    private Long calendarioId;
    
    /** The calendario nombre. */
    private String calendarioNombre;

    /** The password. */
    private String password;

    /** The dni. */
    private String dni;

    /** The telefono. */
    @Pattern(regexp = "\\d{9}", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    /** The email. */
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no tiene un formato válido")
    private String email;

    /** The rol. */
    @NotBlank(message = "El rol es obligatorio")
    private String rol;

    /** The fecha nacimiento. */
    @Past(message = "La fecha de nacimiento debe estar en el pasado")
    private LocalDate fechaNacimiento;

    /** The genero. */
    private String genero;

    /** The convenio. */
    // Datos laborales
    private String convenio;

    /** The horario id. */
    private Long horarioId;
    
    /** The horario nombre. */
    private String horarioNombre;
    
    /** The tipo contrato. */
    private String tipoContrato;
    
    /** The contrato desde. */
    private LocalDate contratoDesde;
    
    /** The indefinido. */
    private boolean indefinido;
    
    /** The centro. */
    private String centro;
    
    /** The puesto. */
    private String puesto;
    
    /** The politica vacaciones. */
    private String politicaVacaciones;
    
    /** The frecuencia firma. */
    private String frecuenciaFirma;

    /** The notificaciones. */
    // Configuración
    private boolean notificaciones;
    
    /** The metodo validacion. */
    private String metodoValidacion;
    
    /** The permisos por defecto. */
    private String permisosPorDefecto;
    
    /** The permisos extra. */
    private String permisosExtra;
    
    /** The baja indefinida. */
    private boolean bajaIndefinida;
    
    /** The activo. */
    private boolean activo;

    /** The app movil. */
    // Métodos de registro
    private boolean appMovil;
    
    /** The app web. */
    private boolean appWeb;

    /** The marcar inicio. */
    // Otros flags
    private boolean marcarInicio;
    
    /** The geolocalizable. */
    private boolean geolocalizable;
    
    /** The permitir correccion. */
    private boolean permitirCorreccion;
    
    /** The permitir horas extra. */
    private boolean permitirHorasExtra;

    /** The equipo. */
    private Equipo equipo;

}
