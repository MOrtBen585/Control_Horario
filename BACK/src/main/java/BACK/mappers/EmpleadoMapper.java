package BACK.mappers;

import BACK.dtos.EmpleadoDto;
import BACK.repositories.models.Empleado;
import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class EmpleadoMapper {

    public EmpleadoDto toDto(Empleado empleado) {
        if (empleado == null) return null;

        EmpleadoDto dto = new EmpleadoDto();

        dto.setId(empleado.getId());
        dto.setCcc(empleado.getCcc());

        // Conversión byte[] -> Base64 String
        if (empleado.getFoto() != null) {
            dto.setFoto(Base64.getEncoder().encodeToString(empleado.getFoto()));
        }

        dto.setNombre(empleado.getNombre());
        dto.setApellidos(empleado.getApellidos());
        dto.setCalendario(empleado.getCalendario());
        dto.setDni(empleado.getDni());
        dto.setTelefono(empleado.getTelefono());
        dto.setEmail(empleado.getEmail());
        dto.setPassword(empleado.getPassword());
        dto.setRol(empleado.getRol());
        dto.setFechaNacimiento(empleado.getFechaNacimiento());
        dto.setGenero(empleado.getGenero());

        dto.setConvenio(empleado.getConvenio());
        dto.setHorario(empleado.getHorario());
        dto.setTipoContrato(empleado.getTipoContrato());
        dto.setContratoDesde(empleado.getContratoDesde());
        dto.setIndefinido(empleado.isIndefinido());
        dto.setCentro(empleado.getCentro());
        dto.setPuesto(empleado.getPuesto());
        dto.setPoliticaVacaciones(empleado.getPoliticaVacaciones());
        dto.setFrecuenciaFirma(empleado.getFrecuenciaFirma());

        dto.setNotificaciones(empleado.isNotificaciones());
        dto.setMetodoValidacion(empleado.getMetodoValidacion());
        dto.setPermisosPorDefecto(empleado.getPermisosPorDefecto());
        dto.setPermisosExtra(empleado.getPermisosExtra());
        dto.setBajaIndefinida(empleado.isBajaIndefinida());
        dto.setActivo(empleado.isActivo());

        dto.setAppMovil(empleado.isAppMovil());
        dto.setAppWeb(empleado.isAppWeb());

        dto.setMarcarInicio(empleado.isMarcarInicio());
        dto.setGeolocalizable(empleado.isGeolocalizable());
        dto.setPermitirCorreccion(empleado.isPermitirCorreccion());
        dto.setPermitirHorasExtra(empleado.isPermitirHorasExtra());

        dto.setEquipo(empleado.getEquipo());

        return dto;
    }

    public Empleado toEntity(EmpleadoDto dto) {
        if (dto == null) return null;

        Empleado empleado = new Empleado();

        empleado.setId(dto.getId());
        empleado.setCcc(dto.getCcc());

        // Conversión Base64 String -> byte[]
        if (dto.getFoto() != null) {
            try {
                empleado.setFoto(Base64.getDecoder().decode(dto.getFoto()));
            } catch (IllegalArgumentException e) {
                empleado.setFoto(null); // O lanza una excepción si prefieres validarlo
            }
        }

        empleado.setNombre(dto.getNombre());
        empleado.setApellidos(dto.getApellidos());
        empleado.setCalendario(dto.getCalendario());
        empleado.setDni(dto.getDni());
        empleado.setTelefono(dto.getTelefono());
        empleado.setEmail(dto.getEmail());
        empleado.setPassword(dto.getPassword());
        empleado.setRol(dto.getRol());
        empleado.setFechaNacimiento(dto.getFechaNacimiento());
        empleado.setGenero(dto.getGenero());

        empleado.setConvenio(dto.getConvenio());
        empleado.setHorario(dto.getHorario());
        empleado.setTipoContrato(dto.getTipoContrato());
        empleado.setContratoDesde(dto.getContratoDesde());
        empleado.setIndefinido(dto.isIndefinido());
        empleado.setCentro(dto.getCentro());
        empleado.setPuesto(dto.getPuesto());
        empleado.setPoliticaVacaciones(dto.getPoliticaVacaciones());
        empleado.setFrecuenciaFirma(dto.getFrecuenciaFirma());

        empleado.setNotificaciones(dto.isNotificaciones());
        empleado.setMetodoValidacion(dto.getMetodoValidacion());
        empleado.setPermisosPorDefecto(dto.getPermisosPorDefecto());
        empleado.setPermisosExtra(dto.getPermisosExtra());
        empleado.setBajaIndefinida(dto.isBajaIndefinida());
        empleado.setActivo(dto.isActivo());

        empleado.setAppMovil(dto.isAppMovil());
        empleado.setAppWeb(dto.isAppWeb());

        empleado.setMarcarInicio(dto.isMarcarInicio());
        empleado.setGeolocalizable(dto.isGeolocalizable());
        empleado.setPermitirCorreccion(dto.isPermitirCorreccion());
        empleado.setPermitirHorasExtra(dto.isPermitirHorasExtra());

        empleado.setEquipo(dto.getEquipo());

        return empleado;
    }
}
