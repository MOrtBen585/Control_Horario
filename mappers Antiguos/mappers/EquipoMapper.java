package BACK.mappers;

import BACK.dtos.EquipoDto;
import BACK.repositories.EmpleadoRepository;
import BACK.repositories.models.Empleado;
import BACK.repositories.models.Equipo;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;


@Component
public class EquipoMapper {


    private final EmpleadoRepository empleadoRepository;

    public EquipoMapper(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public EquipoDto toDto(Equipo equipo) {
        EquipoDto dto = new EquipoDto();
        dto.setId(equipo.getId());
        dto.setNombre(equipo.getNombre());
        dto.setEmpleadosIds(
                equipo.getEmpleados().stream()
                        .map(Empleado::getId)
                        .collect(Collectors.toList())
        );
        return dto;
    }

    public Equipo toEntity(EquipoDto dto) {
        Equipo equipo = new Equipo();
        equipo.setId(dto.getId());
        equipo.setNombre(dto.getNombre());
        if (dto.getEmpleadosIds() != null) {
            equipo.setEmpleados(
                    dto.getEmpleadosIds().stream()
                            .map(id -> empleadoRepository.findById(id)
                                    .orElseThrow(() -> new RuntimeException("Empleado no encontrado con id: " + id)))
                            .collect(Collectors.toList())
            );
        }
        return equipo;
    }
}

