package BACK.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import BACK.dtos.request.HorarioRequestDto;
import BACK.dtos.response.HorarioResponseDto;
import BACK.repositories.models.Horario;

/**
 * The Interface HorarioMapper.
 */
@Mapper(componentModel = "spring")
public interface HorarioMapper {

    /** The instance. */
    HorarioMapper INSTANCE = Mappers.getMapper(HorarioMapper.class);

    /**
     * To entity.
     *
     * @param dto the dto
     * @return the horario
     */
    // Mapea DTO de petición a entidad
    Horario toEntity(HorarioRequestDto dto);

    /**
     * To dto.
     *
     * @param entity the entity
     * @return the horario response dto
     */
    // Mapea entidad a DTO de respuesta
    HorarioResponseDto toDto(Horario entity);
}
