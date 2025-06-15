package BACK.dtos;

import java.time.LocalDateTime;

import BACK.repositories.models.Empleado;
import lombok.Data;

/**
 * The Class FichajeDto.
 */
@Data
public class FichajeDto {

    /** The id. */
    private Long id;
    
    /** The empleado id. */
    private Long empleadoId;
    
    /** The tipo. */
    private String tipo; // ENTRADA o SALIDA
    
    /** The estado. */
    private String estado;
    
    /** The fecha. */
    private LocalDateTime fecha;
    
    /** The dia semana. */
    private String diaSemana;
    
    /** The horario. */
    private String horario;
    
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

    /** The empleado. */
    private Empleado empleado;
}
