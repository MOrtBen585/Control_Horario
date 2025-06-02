package BACK.dtos.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FichajeRequestDto {
    private Long empleadoId;
    private LocalDateTime fecha;
    private String tipo; // "inicio" o "fin"
    private String metodoRegistro;
    private boolean geolocalizacion;
    private Double latitud;
    private Double longitud;
}
