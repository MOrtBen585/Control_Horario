package BACK.mappers;

import java.time.DayOfWeek;

import org.springframework.stereotype.Component;

import BACK.dtos.FichajeDto;
import BACK.dtos.request.FichajeRequestDto;
import BACK.repositories.models.Empleado;
import BACK.repositories.models.Fichaje;

@Component
public class FichajeMapper {

    public Fichaje toEntity(FichajeRequestDto request, Empleado empleado) {
        Fichaje fichaje = new Fichaje();
        fichaje.setFecha(request.getFecha());
        fichaje.setTipo(request.getTipo());
        fichaje.setMetodoRegistro(request.getMetodoRegistro());
        fichaje.setGeolocalizacion(request.isGeolocalizacion());
        fichaje.setEmpleado(empleado);

        if (request.isGeolocalizacion()) {
            fichaje.setLatitud(request.getLatitud());
            fichaje.setLongitud(request.getLongitud());
        } else {
            fichaje.setLatitud(null);
            fichaje.setLongitud(null);
        }

        return fichaje;
    }

    public FichajeDto toDto(Fichaje fichaje, Empleado empleado) {
        FichajeDto dto = new FichajeDto();
        dto.setId(fichaje.getId());
        dto.setEmpleadoId(fichaje.getEmpleado().getId());
        dto.setEstado(fichaje.getEstado());
        dto.setFecha(fichaje.getFecha());
        dto.setDiaSemana(traducirDia(fichaje.getFecha().getDayOfWeek()));
        dto.setHorario(obtenerHorarioDelDia(empleado)); // ✅ Correcto
        dto.setMetodoRegistro(fichaje.getMetodoRegistro());
        dto.setGeolocalizacion(fichaje.isGeolocalizacion());
        dto.setGeocercas(fichaje.isGeocercas());
        dto.setEmpleado(empleado);
        return dto;
    }

    private static String traducirDia(DayOfWeek dia) {
        switch (dia) {
            case MONDAY: return "Lunes";
            case TUESDAY: return "Martes";
            case WEDNESDAY: return "Miércoles";
            case THURSDAY: return "Jueves";
            case FRIDAY: return "Viernes";
            case SATURDAY: return "Sábado";
            case SUNDAY: return "Domingo";
            default: return "";
        }
    }
    
    private String obtenerHorarioDelDia(Empleado empleado) {
        if (empleado.getHorario() == null) return "N/A";

        String horarioGeneral = empleado.getHorario().getHorario(); // por ejemplo, "09:00-14:00"
        return horarioGeneral != null ? horarioGeneral : "N/A";
    }


}
