package BACK.mappers;

import org.mapstruct.Mapper;

import BACK.dtos.EmpleadoDto;
import BACK.repositories.models.Empleado;

@Mapper(componentModel = "spring")
public interface EmpleadoMapper {

    EmpleadoDto toDto(Empleado empleado);

    Empleado toEntity(EmpleadoDto empleadoDto);
}
