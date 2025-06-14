package BACK.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import BACK.dtos.request.HorarioRequestDto;
import BACK.dtos.response.HorarioResponseDto;
import BACK.repositories.models.Horario;

@Mapper(componentModel = "spring")
public interface HorarioMapper {

    HorarioMapper INSTANCE = Mappers.getMapper(HorarioMapper.class);

    // Mapea DTO de petición a entidad
    Horario toEntity(HorarioRequestDto dto);

    // Mapea entidad a DTO de respuesta
    HorarioResponseDto toDto(Horario entity);
}
