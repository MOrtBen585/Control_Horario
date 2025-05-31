package BACK.dtos;

import lombok.Data;

@Data
public class MetodosContactoDto {
    private boolean appMovil;
    private boolean appWeb;
    private boolean telefono;
    private boolean email;
}
