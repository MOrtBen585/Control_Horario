package BACK.repositories.models;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class MetodosContacto {
    private boolean appMovil;
    private boolean appWeb;
    private boolean telefono;
    private boolean email;

    // Getters y setters
}
