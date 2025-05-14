package BACK.dtos.request;

import lombok.Data;

@Data
public class FichajeRequestDto {
    private Long empleadoId;
    private String fecha;
    private String tipo; // "inicio" o "fin"
    private String metodoRegistro;
    private boolean geolocalizacion;
    private Double latitud;
    private Double longitud;
}
