package BACK.dtos;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
public class EquipoDto {

    private Long id;

    @NotBlank(message = "El nombre del equipo es obligatorio")
    private String nombre;

    private List<Long> empleadosIds;
}


