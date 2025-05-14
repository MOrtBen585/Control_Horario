package BACK.services;

import BACK.dtos.FichajeDto;
import BACK.dtos.request.FichajeRequestDto;
import BACK.mappers.FichajeMapper;
import BACK.repositories.EmpleadoRepository;
import BACK.repositories.FichajeRepository;
import BACK.repositories.models.Empleado;
import BACK.repositories.models.Fichaje;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<FichajeDto> obtenerFichajesDelUsuarioActual(Authentication auth) {
        Empleado empleado = empleadoRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        return fichajeRepository.findByEmpleadoId(empleado.getId())
                .stream()
                .map(fichajeMapper::toDto)
                .toList();
    }


    public List<Fichaje> obtenerFichajesDelUsuarioPorFecha(Authentication auth, String fecha) {
        Empleado empleado = empleadoRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        return fichajeRepository.findByEmpleadoIdAndFecha(empleado.getId(), fecha);
    }

    public List<Fichaje> obtenerFichajesPorEmpleado(Long id) {
        return fichajeRepository.findByEmpleadoId(id);
    }
}
