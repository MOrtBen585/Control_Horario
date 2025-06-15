package BACK.dtos.request;

import java.time.LocalDateTime;

import lombok.Data;

/**
 * The Class FichajeRequestDto.
 */
@Data
public class FichajeRequestDto {
    
    /** The empleado id. */
    private Long empleadoId;
    
    /** The fecha. */
    private LocalDateTime fecha;
    
    /** The tipo. */
    private String tipo; // "inicio" o "fin"
    
    /** The metodo registro. */
    private String metodoRegistro;
    
    /** The geolocalizacion. */
    private boolean geolocalizacion;
    
    /** The latitud. */
    private Double latitud;
    
    /** The longitud. */
    private Double longitud;
}
