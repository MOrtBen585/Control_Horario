package BACK.repositories.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDateTime;

@Entity
@Data
public class Fichaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime registroEntrada;
    private LocalDateTime fecha;
    private String tipo;
    private String metodoRegistro;
    private boolean geolocalizacion;
    private boolean geocercas;

    private Double latitud;
    private Double longitud;

    private String estado = "Pendiente"; // por defecto

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empleado_id")
    private Empleado empleado;
}
