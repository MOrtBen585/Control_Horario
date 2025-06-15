package BACK.dtos.response;

import java.util.List;

import BACK.repositories.models.Horario.Rotacion;
import lombok.Data;

/**
 * The Class HorarioResponseDto.
 */
@Data
public class HorarioResponseDto {
    
    /** The id. */
    private Long id;
    
    /** The nombre. */
    private String nombre;
    
    /** The predeterminado. */
    private boolean predeterminado;
    
    /** The dias. */
    private List<Boolean> dias;
    
    /** The meses. */
    private List<Boolean> meses;
    
    /** The rotacion. */
    private Rotacion rotacion;
    
    /** The horario. */
    private String horario;  // nuevo
}
