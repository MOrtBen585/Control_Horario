package BACK.repositories.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class Empleado.
 */
@Entity
@Getter
@Setter
public class Empleado {

    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The ccc. */
    // Datos personales
    private String ccc;

    /** The foto. */
    @Lob
    @Column(name = "foto", columnDefinition = "MEDIUMBLOB")
    private byte[] foto;
    
    /** The nombre. */
    private String nombre;
    
    /** The apellidos. */
    private String apellidos;
    
    /** The calendario. */
    @ManyToOne
    @JoinColumn(name = "calendario_id")
    private Calendario calendario;
    
    /** The dni. */
    private String dni;
    
    /** The telefono. */
    private String telefono;
    
    /** The email. */
    @Column(nullable = false, unique = true)
    private String email;
    
    /** The password. */
    private String password;
    
    /** The rol. */
    @Column(nullable = false)
    private String rol; // valores: "ADMIN", "EMPLEADO", etc.
    
    /** The fecha nacimiento. */
    private LocalDate fechaNacimiento;
    
    /** The genero. */
    private String genero;

    /** The convenio. */
    // Datos laborales
    private String convenio;
    
    /** The horario. */
    @ManyToOne
    @JoinColumn(name = "horario_id")
    private Horario horario;

    /** The tipo contrato. */
    private String tipoContrato;
    
    /** The contrato desde. */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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
    
    /** The geocercas. */
    private boolean geocercas;
    
    /** The permitir correccion. */
    private boolean permitirCorreccion;
    
    /** The permitir horas extra. */
    private boolean permitirHorasExtra;

    /** The equipo. */
    // Relación con equipo
    @ManyToOne
    @JoinColumn(name = "equipo_id", nullable = true)
    private Equipo equipo;

	// Getters y setters
    
}
