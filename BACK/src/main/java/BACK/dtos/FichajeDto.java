package BACK.dtos;

import BACK.repositories.models.Empleado;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FichajeDto {

    private Long id;
    private Long empleadoId;
    private String tipo; // ENTRADA o SALIDA
    private String estado;
    private LocalDateTime fecha;
    private String diaSemana;
    private String horario;
    private String metodoRegistro;
    private boolean geolocalizacion;
    private boolean geocercas;
    private Double latitud;
    private Double longitud;

    private Empleado empleado;
}
