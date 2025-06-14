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

@Entity
@Data
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private boolean predeterminado;

    @ElementCollection
    @CollectionTable(name = "horario_dias", joinColumns = @JoinColumn(name = "horario_id"))
    @Column(name = "dia")
    private List<Boolean> dias;

    @ElementCollection
    @CollectionTable(name = "horario_meses", joinColumns = @JoinColumn(name = "horario_id"))
    @Column(name = "mes")
    private List<Boolean> meses;

    @Enumerated(EnumType.STRING)
    private Rotacion rotacion;

    // Nuevo campo
    private String horario;

    public enum Rotacion {
        none, weekly, daily
    }
}
