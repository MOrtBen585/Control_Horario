package BACK.dtos;

import lombok.Data;

/**
 * The Class MetodosContactoDto.
 */
@Data
public class MetodosContactoDto {
    
    /** The app movil. */
    private boolean appMovil;
    
    /** The app web. */
    private boolean appWeb;
    
    /** The telefono. */
    private boolean telefono;
    
    /** The email. */
    private boolean email;
}
