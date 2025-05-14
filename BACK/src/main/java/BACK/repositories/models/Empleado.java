package BACK.repositories.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Datos personales
    private String ccc;
    private String foto;
    private String nombre;
    private String apellidos;
    private String calendario;
    private String dni;
    private String telefono;
    private String email;
    private String password;
    @Column(nullable = false)
    private String rol; // valores: "ADMIN", "EMPLEADO", etc.
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
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "email", column = @Column(name = "metodo_email")),
            @AttributeOverride(name = "telefono", column = @Column(name = "metodo_telefono")),
            @AttributeOverride(name = "appMovil", column = @Column(name = "metodo_app_movil")),
            @AttributeOverride(name = "appWeb", column = @Column(name = "metodo_app_web"))
    })
    private MetodosContacto metodos;


    // Otros flags
    private boolean marcarInicio;
    private boolean geolocalizable;
    private boolean permitirCorreccion;
    private boolean permitirHorasExtra;

    // Relación con equipo
    @ManyToOne
    @JoinColumn(name = "equipo_id", nullable = true)
    private Equipo equipo;

    // Getters y setters
}
