package BACK.dtos;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * The Class EquipoDto.
 */
@Data
public class EquipoDto {

    /** The id. */
    private Long id;

    /** The nombre. */
    @NotBlank(message = "El nombre del equipo es obligatorio")
    private String nombre;

    /** The empleados ids. */
    private List<Long> empleadosIds;
}


