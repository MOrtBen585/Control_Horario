package BACK.dtos;

import lombok.Data;

@Data
public class FichajeDto {
    private Long id;
    private String estado;
    private String fecha;
    private String tipo;
    private String metodoRegistro;
    private boolean geolocalizacion;
    private Double latitud;
    private Double longitud;

    private String empleadoNombre; // nombre del empleado (opcional, para ADMIN)
}
