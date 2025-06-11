package BACK.mappers;

import org.mapstruct.Mapper;

import BACK.dtos.CalendarioDto;
import BACK.repositories.models.Calendario;

@Mapper(componentModel = "spring")
public interface CalendarioMapper {
    CalendarioDto toDto(Calendario calendario);
    Calendario toEntity(CalendarioDto dto);
}
