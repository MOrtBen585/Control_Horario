package BACK.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import BACK.dtos.EmpleadoDto;
import BACK.repositories.models.Empleado;

/**
 * The Interface EmpleadoMapper.
 */
@Mapper(componentModel = "spring", uses = {HorarioMapperHelper.class, CalendarioMapperHelper.class})
public interface EmpleadoMapper {

    /**
     * To dto.
     *
     * @param empleado the empleado
     * @return the empleado dto
     */
    @Mapping(target = "horarioId", expression = "java(empleado.getHorario() != null ? empleado.getHorario().getId() : null)")
    @Mapping(target = "horarioNombre", expression = "java(empleado.getHorario() != null ? empleado.getHorario().getNombre() : null)")
    @Mapping(target = "calendarioId", expression = "java(empleado.getCalendario() != null ? empleado.getCalendario().getId() : null)")
    @Mapping(target = "calendarioNombre", expression = "java(empleado.getCalendario() != null ? empleado.getCalendario().getNombre() : null)")
    EmpleadoDto toDto(Empleado empleado);

    /**
     * To entity.
     *
     * @param dto the dto
     * @return the empleado
     */
    @Mapping(target = "horario", source = "horarioId")
    @Mapping(target = "calendario", source = "calendarioId")
    Empleado toEntity(EmpleadoDto dto);
}
