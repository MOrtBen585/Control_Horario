package BACK.mappers;

import org.mapstruct.Mapper;

import BACK.dtos.CalendarioDto;
import BACK.repositories.models.Calendario;

/**
 * The Interface CalendarioMapper.
 */
@Mapper(componentModel = "spring")
public interface CalendarioMapper {
    
    /**
     * To dto.
     *
     * @param calendario the calendario
     * @return the calendario dto
     */
    CalendarioDto toDto(Calendario calendario);
    
    /**
     * To entity.
     *
     * @param dto the dto
     * @return the calendario
     */
    Calendario toEntity(CalendarioDto dto);
}
