package BACK.services;

import BACK.repositories.EmpleadoRepository;
import BACK.repositories.models.Empleado;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;

    @Autowired
    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }

    public Optional<Empleado> findById(Long id) {
        return empleadoRepository.findById(id);
    }

    public Empleado save(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    public Empleado update(Long id, Empleado updatedEmpleado) {
        return empleadoRepository.findById(id)
                .map(e -> {
                    updatedEmpleado.setId(id);
                    return empleadoRepository.save(updatedEmpleado);
                })
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con id " + id));
    }

    public void delete(Long id) {
        empleadoRepository.deleteById(id);
    }
}

