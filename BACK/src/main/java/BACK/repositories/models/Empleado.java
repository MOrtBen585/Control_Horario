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

@Entity
@Getter
@Setter
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Datos personales
    private String ccc;

    @Lob
    @Column(name = "foto", columnDefinition = "MEDIUMBLOB")
    private byte[] foto;
    private String nombre;
    private String apellidos;
    private String calendario;
    private String dni;
    private String telefono;
    @Column(nullable = false, unique = true)
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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
    private boolean geocercas;
    private boolean permitirCorreccion;
    private boolean permitirHorasExtra;

    // Relación con equipo
    @ManyToOne
    @JoinColumn(name = "equipo_id", nullable = true)
    private Equipo equipo;

	// Getters y setters
    
}
