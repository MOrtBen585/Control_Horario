package BACK.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import BACK.dtos.EmpleadoFichajeDto;
import BACK.dtos.FichajeDto;
import BACK.dtos.request.FichajeRequestDto;
import BACK.mappers.FichajeMapper;
import BACK.repositories.EmpleadoRepository;
import BACK.repositories.FichajeRepository;
import BACK.repositories.HorarioRepository;
import BACK.repositories.models.Empleado;
import BACK.repositories.models.Fichaje;
import jakarta.persistence.EntityNotFoundException;
/**
 * The Class FichajeService.
 */
@Service
public class FichajeService {

    /** The fichaje repository. */
    private final FichajeRepository fichajeRepository;
    
    /** The empleado repository. */
    private final EmpleadoRepository empleadoRepository;
    
    /** The fichaje mapper. */
    private final FichajeMapper fichajeMapper;

    /**
     * Instantiates a new fichaje service.
     *
     * @param fichajeRepository the fichaje repository
     * @param empleadoRepository the empleado repository
     * @param fichajeMapper the fichaje mapper
     * @param horarioRepository the horario repository
     */
    public FichajeService(FichajeRepository fichajeRepository,
                          EmpleadoRepository empleadoRepository,
                          FichajeMapper fichajeMapper, HorarioRepository horarioRepository) {
        this.fichajeRepository = fichajeRepository;
        this.empleadoRepository = empleadoRepository;
        this.fichajeMapper = fichajeMapper;
    }

    /**
     * Registrar fichaje.
     *
     * @param request the request
     * @return the fichaje
     */
    public Fichaje registrarFichaje(FichajeRequestDto request) {
        Empleado empleado = empleadoRepository.findById(request.getEmpleadoId())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        Fichaje fichaje = fichajeMapper.toEntity(request, empleado);
        return fichajeRepository.save(fichaje);
    }

    /**
     * Obtener fichajes del usuario actual.
     *
     * @param auth the auth
     * @param pageable the pageable
     * @return the page
     */
    public Page<FichajeDto> obtenerFichajesDelUsuarioActual(Authentication auth, Pageable pageable) {
        Empleado empleado = empleadoRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        return fichajeRepository.findByEmpleadoId(empleado.getId(), pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    /**
     * Obtener fichajes del usuario por fecha.
     *
     * @param auth the auth
     * @param fecha the fecha
     * @param pageable the pageable
     * @return the page
     */
    public Page<FichajeDto> obtenerFichajesDelUsuarioPorFecha(Authentication auth, String fecha, Pageable pageable) {
        Empleado empleado = empleadoRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        return fichajeRepository.findByEmpleadoIdAndFecha(empleado.getId(), fecha, pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    /**
     * Obtener fichajes por empleado.
     *
     * @param id the id
     * @param pageable the pageable
     * @return the page
     */
    public Page<FichajeDto> obtenerFichajesPorEmpleado(Long id, Pageable pageable) {
        return fichajeRepository.findByEmpleadoId(id, pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    /**
     * Obtener todos.
     *
     * @param pageable the pageable
     * @return the page
     */
    public Page<FichajeDto> obtenerTodos(Pageable pageable) {
        return fichajeRepository.findAll(pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }

    /**
     * Gets the fichajes de empleados activos.
     *
     * @param pageable the pageable
     * @return the fichajes de empleados activos
     */
    public Page<FichajeDto> getFichajesDeEmpleadosActivos(Pageable pageable) {
        return fichajeRepository.findByEmpleado_ActivoTrue(pageable)
                .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()));
    }
    
    /**
     * Gets the all actives.
     *
     * @return the all actives
     */
    public List<FichajeDto> getAllActives() {
        List<Fichaje> fichajes = fichajeRepository.findByEmpleado_ActivoTrue();
        return fichajes.stream()
                       .map(fichaje -> fichajeMapper.toDto(fichaje, fichaje.getEmpleado()))
                       .toList();
    }


    /**
     * Gets the info para fichar.
     *
     * @param empleadoId the empleado id
     * @return the info para fichar
     */
    public EmpleadoFichajeDto getInfoParaFichar(Long empleadoId) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado con ID: " + empleadoId));
       
        

        Optional<Fichaje> ultimoFichaje = fichajeRepository.findTopByEmpleadoIdOrderByFechaDesc(empleadoId);

        EmpleadoFichajeDto dto = new EmpleadoFichajeDto();
        dto.setEmpleadoId(empleado.getId());
        dto.setNombre(empleado.getNombre());
        dto.setApellidos(empleado.getApellidos());
        dto.setPuesto(empleado.getPuesto());
        dto.setHorario(empleado.getHorario().getHorario()); 
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


    /**
     * Registrar fichaje.
     *
     * @param dto the dto
     * @return the fichaje
     */
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
