package BACK.repositories.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

/**
 * The Class Fichaje.
 */
@Entity
@Data
public class Fichaje {

    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /** The registro entrada. */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime registroEntrada;
    
    /** The fecha. */
    private LocalDateTime fecha;
    
    /** The tipo. */
    private String tipo;
    
    /** The metodo registro. */
    private String metodoRegistro;
    
    /** The geolocalizacion. */
    private boolean geolocalizacion;
    
    /** The geocercas. */
    private boolean geocercas;

    /** The latitud. */
    private Double latitud;
    
    /** The longitud. */
    private Double longitud;

    /** The estado. */
    private String estado = "Pendiente"; // por defecto

    /** The empleado. */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;
}
