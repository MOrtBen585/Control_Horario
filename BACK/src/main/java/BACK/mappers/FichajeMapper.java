package BACK.mappers;

import BACK.dtos.FichajeDto;
import BACK.repositories.models.Empleado;
import BACK.repositories.models.Fichaje;
import BACK.dtos.request.FichajeRequestDto;
import org.springframework.stereotype.Component;

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

    public FichajeDto toDto(Fichaje entity) {
        FichajeDto dto = new FichajeDto();
        dto.setId(entity.getId());
        dto.setEstado(entity.getEstado());
        dto.setFecha(entity.getFecha());
        dto.setTipo(entity.getTipo());
        dto.setMetodoRegistro(entity.getMetodoRegistro());
        dto.setGeolocalizacion(entity.isGeolocalizacion());
        dto.setLatitud(entity.getLatitud());
        dto.setLongitud(entity.getLongitud());

        if (entity.getEmpleado() != null) {
            dto.setEmpleadoNombre(entity.getEmpleado().getNombre());
        }

        return dto;
    }

}
