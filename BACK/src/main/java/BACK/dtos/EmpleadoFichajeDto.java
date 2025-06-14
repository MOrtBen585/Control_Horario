package BACK.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class EmpleadoFichajeDto {

    private Long empleadoId;
    private String nombre;
    private String apellidos;
    private String puesto;
    private String horario;
    private boolean geolocalizable;
    private boolean marcarInicio;
    private boolean permitirCorreccion;

    private String estadoSiguiente; // "ENTRADA" o "SALIDA"
    private LocalDateTime ultimaEntrada;
    private LocalDateTime ultimaSalida;
}
