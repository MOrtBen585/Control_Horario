package BACK.dtos;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * The Class EmpleadoFichajeDto.
 */
@Data
public class EmpleadoFichajeDto {

    /** The empleado id. */
    private Long empleadoId;
    
    /** The nombre. */
    private String nombre;
    
    /** The apellidos. */
    private String apellidos;
    
    /** The puesto. */
    private String puesto;
    
    /** The horario. */
    private String horario;
    
    /** The geolocalizable. */
    private boolean geolocalizable;
    
    /** The marcar inicio. */
    private boolean marcarInicio;
    
    /** The permitir correccion. */
    private boolean permitirCorreccion;

    /** The estado siguiente. */
    private String estadoSiguiente; // "ENTRADA" o "SALIDA"
    
    /** The ultima entrada. */
    private LocalDateTime ultimaEntrada;
    
    /** The ultima salida. */
    private LocalDateTime ultimaSalida;
}
