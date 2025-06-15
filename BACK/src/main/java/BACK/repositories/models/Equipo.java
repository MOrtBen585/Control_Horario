package BACK.repositories.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

/**
 * The Class Equipo.
 */
@Entity
@Data
public class Equipo {

    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The nombre. */
    private String nombre;

    /** The empleados. */
    @OneToMany(mappedBy = "equipo")
    private List<Empleado> empleados;

    // Getters y setters
}
