package BACK.mappers;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import BACK.dtos.EquipoDto;
import BACK.repositories.EmpleadoRepository;
import BACK.repositories.models.Empleado;
import BACK.repositories.models.Equipo;


/**
 * The Class EquipoMapper.
 */
@Component
public class EquipoMapper {


    /** The empleado repository. */
    private final EmpleadoRepository empleadoRepository;

    /**
     * Instantiates a new equipo mapper.
     *
     * @param empleadoRepository the empleado repository
     */
    public EquipoMapper(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    /**
     * To dto.
     *
     * @param equipo the equipo
     * @return the equipo dto
     */
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

    /**
     * To entity.
     *
     * @param dto the dto
     * @return the equipo
     */
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

