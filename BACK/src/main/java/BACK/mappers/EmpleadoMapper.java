package BACK.mappers;

import BACK.dtos.EmpleadoDto;
import BACK.repositories.models.Empleado;
import org.springframework.stereotype.Component;

@Component
public class EmpleadoMapper {

    public EmpleadoDto toDto(Empleado empleado) {
        EmpleadoDto dto = new EmpleadoDto();
        dto.setId(empleado.getId());
        dto.setRol(empleado.getRol());
        dto.setNombre(empleado.getNombre());
        dto.setApellidos(empleado.getApellidos());
        dto.setEmail(empleado.getEmail());
        dto.setTelefono(empleado.getTelefono());
        dto.setPuesto(empleado.getPuesto());
        dto.setFechaNacimiento(empleado.getFechaNacimiento());
        dto.setActivo(empleado.isActivo());
        return dto;
    }

    public Empleado toEntity(EmpleadoDto dto) {
        Empleado e = new Empleado();
        e.setId(dto.getId());
        e.setRol(dto.getRol());
        e.setNombre(dto.getNombre());
        e.setApellidos(dto.getApellidos());
        e.setEmail(dto.getEmail());
        e.setTelefono(dto.getTelefono());
        e.setPuesto(dto.getPuesto());
        e.setFechaNacimiento(dto.getFechaNacimiento());
        e.setActivo(dto.isActivo());
        return e;
    }
}
