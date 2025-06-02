package BACK.services;

import BACK.dtos.EmpleadoDto;
import BACK.dtos.EmpleadoFichajeDto;
import BACK.dtos.FichajeDto;
import BACK.dtos.request.FichajeRequestDto;
import BACK.mappers.FichajeMapper;
import BACK.repositories.EmpleadoRepository;
import BACK.repositories.FichajeRepository;
import BACK.repositories.models.Empleado;
import BACK.repositories.models.Fichaje;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FichajeService {

    private final FichajeRepository fichajeRepository;
    private final EmpleadoRepository empleadoRepository;
    private final FichajeMapper fichajeMapper;

    public FichajeService(FichajeRepository fichajeRepository,
                          EmpleadoRepository empleadoRepository,
                          FichajeMapper fichajeMapper) {
        this.fichajeRepository = fichajeRepository;
        this.empleadoRepository = empleadoRepository;
        this.fichajeMapper = fichajeMapper;
    }

    public Fichaje registrarFichaje(FichajeRequestDto request) {
        Empleado empleado = empleadoRepository.findById(request.getEmpleadoId())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        Fichaje fichaje = fichajeMapper.toEntity(request, empleado);
        return fichajeRepository.save(fichaje);
    }

    public Page<FichajeDto> obtenerFichajesDelUsuarioActual(Authentication auth, Pageable pageable) {
        Empleado empleado = empleadoRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        return fichajeRepository.findByEmpleadoId(empleado.getId(), pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    public Page<FichajeDto> obtenerFichajesDelUsuarioPorFecha(Authentication auth, String fecha, Pageable pageable) {
        Empleado empleado = empleadoRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        return fichajeRepository.findByEmpleadoIdAndFecha(empleado.getId(), fecha, pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    public Page<FichajeDto> obtenerFichajesPorEmpleado(Long id, Pageable pageable) {
        return fichajeRepository.findByEmpleadoId(id, pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    public Page<FichajeDto> obtenerTodos(Pageable pageable) {
        return fichajeRepository.findAll(pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    public Page<FichajeDto> getFichajesDeEmpleadosActivos(Pageable pageable) {
        return fichajeRepository.findByEmpleado_ActivoTrue(pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    public EmpleadoFichajeDto getInfoParaFichar(Long empleadoId) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado con ID: " + empleadoId));

        Optional<Fichaje> ultimoFichaje = fichajeRepository.findTopByEmpleadoIdOrderByFechaDesc(empleadoId);

        EmpleadoFichajeDto dto = new EmpleadoFichajeDto();
        dto.setEmpleadoId(empleado.getId());
        dto.setNombre(empleado.getNombre());
        dto.setApellidos(empleado.getApellidos());
        dto.setPuesto(empleado.getPuesto());
        dto.setHorario(empleado.getHorario()); // 👈 ESTA LÍNEA FALTABA
        dto.setGeolocalizable(empleado.isGeolocalizable());
        dto.setMarcarInicio(empleado.isMarcarInicio());
        dto.setPermitirCorreccion(empleado.isPermitirCorreccion());

        if (ultimoFichaje.isPresent()) {
            Fichaje f = ultimoFichaje.get();
            if ("ENTRADA".equalsIgnoreCase(f.getTipo())) {
                dto.setEstadoSiguiente("SALIDA");
                dto.setUltimaEntrada(f.getFecha());
            } else {
                dto.setEstadoSiguiente("ENTRADA");
                dto.setUltimaSalida(f.getFecha());
            }
        } else {
            dto.setEstadoSiguiente("ENTRADA"); // primer fichaje
        }

        return dto;
    }


    public Fichaje registrarFichaje(FichajeDto dto) {
        Empleado empleado = empleadoRepository.findById(dto.getEmpleadoId())
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado"));

        Fichaje fichaje = new Fichaje();
        fichaje.setEmpleado(empleado);
        fichaje.setTipo(dto.getTipo()); // ENTRADA o SALIDA
        fichaje.setMetodoRegistro(dto.getMetodoRegistro());
        fichaje.setGeolocalizacion(dto.isGeolocalizacion());
        fichaje.setGeocercas(dto.isGeocercas());
        fichaje.setLatitud(dto.getLatitud());
        fichaje.setLongitud(dto.getLongitud());

        LocalDateTime now = LocalDateTime.now();
        fichaje.setFecha(now);
        fichaje.setRegistroEntrada(now); // opcional: puedes tener lógica separada para entrada/salida

        fichaje.setEstado("Registrado");

        return fichajeRepository.save(fichaje);
    }


}
