package BACK.dtos.request;

import java.util.List;

import BACK.repositories.models.Horario.Rotacion;
import lombok.Data;

@Data
public class HorarioRequestDto {
    private String nombre;
    private boolean predeterminado;
    private List<Boolean> dias;
    private List<Boolean> meses;
    private Rotacion rotacion;
    private String horario;  // nuevo
}
