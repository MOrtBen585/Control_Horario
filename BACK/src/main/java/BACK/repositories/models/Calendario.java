// src/main/java/BACK/repositories/models/Calendario.java
package BACK.repositories.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Calendario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ElementCollection
    @CollectionTable(name = "calendario_dias", joinColumns = @JoinColumn(name = "calendario_id"))
    @Column(name = "fecha")
    private List<LocalDate> diasFestivos;
}
