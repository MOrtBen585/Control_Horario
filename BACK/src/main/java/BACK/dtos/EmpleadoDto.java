package BACK.dtos;

import java.time.LocalDate;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Data
public class EmpleadoDto {

    private Long id;

    private String rol;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;

    @Email(message = "El email no tiene un formato válido")
    private String email;

    @Pattern(regexp = "\\d{9}", message = "El teléfono debe tener 9 dígitos")
    private String telefono;

    @NotBlank(message = "El puesto es obligatorio")
    private String puesto;

    @Past(message = "La fecha de nacimiento debe ser en el pasado")
    private LocalDate fechaNacimiento;
    
    private LocalDate contratoDesde;

    private boolean activo;
}


