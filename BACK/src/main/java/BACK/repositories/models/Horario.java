package BACK.repositories.models;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

/**
 * The Class Horario.
 */
@Entity
@Data
public class Horario {

    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The nombre. */
    private String nombre;
    
    /** The predeterminado. */
    private boolean predeterminado;

    /** The dias. */
    @ElementCollection
    @CollectionTable(name = "horario_dias", joinColumns = @JoinColumn(name = "horario_id"))
    @Column(name = "dia")
    private List<Boolean> dias;

    /** The meses. */
    @ElementCollection
    @CollectionTable(name = "horario_meses", joinColumns = @JoinColumn(name = "horario_id"))
    @Column(name = "mes")
    private List<Boolean> meses;

    /** The rotacion. */
    @Enumerated(EnumType.STRING)
    private Rotacion rotacion;

    /** The horario. */
    // Nuevo campo
    private String horario;

    /**
     * The Enum Rotacion.
     */
    public enum Rotacion {
        
        /** The none. */
        none, 
 /** The weekly. */
 weekly, 
 /** The daily. */
 daily
    }
}
