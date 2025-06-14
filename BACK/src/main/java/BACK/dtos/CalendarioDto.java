package BACK.dtos;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarioDto {
    private Long id;
    private String nombre;
    private List<LocalDate> diasFestivos;
}
