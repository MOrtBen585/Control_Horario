package BACK.repositories.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Fichaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fecha;
    private String tipo;
    private String metodoRegistro;
    private boolean geolocalizacion;

    private Double latitud;
    private Double longitud;

    private String estado = "Pendiente"; // por defecto

    @ManyToOne
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;
}
