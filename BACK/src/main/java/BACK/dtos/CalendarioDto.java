package BACK.dtos;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class CalendarioDto.
 */
@Getter
@Setter
public class CalendarioDto {
    
    /** The id. */
    private Long id;
    
    /** The nombre. */
    private String nombre;
    
    /** The dias festivos. */
    private List<LocalDate> diasFestivos;
}
