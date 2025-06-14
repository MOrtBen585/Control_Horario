package BACK.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import BACK.dtos.EmpleadoDto;
import BACK.mappers.EmpleadoMapper;
import BACK.repositories.EmpleadoRepository;
import BACK.repositories.models.Empleado;
import jakarta.persistence.EntityNotFoundException;

@Service
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;
    private final EmpleadoMapper empleadoMapper;

    @Autowired
    public EmpleadoService(EmpleadoRepository empleadoRepository, EmpleadoMapper empleadoMapper) {
        this.empleadoRepository = empleadoRepository;
        this.empleadoMapper = empleadoMapper;
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

    public EmpleadoDto update(Long id, EmpleadoDto updatedEmpleadoDto) {
        Empleado updated = empleadoRepository.findById(id)
                .map(existing -> {
                    updatedEmpleadoDto.setId(id);
                    Empleado toSave = empleadoMapper.toEntity(updatedEmpleadoDto);
                    return empleadoRepository.save(toSave);
                })
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con id " + id));

        return empleadoMapper.toDto(updated);
    }


    public void delete(Long id) {
        empleadoRepository.deleteById(id);
    }

    public Page<Empleado> findAllActivos(Pageable pageable) {
        return empleadoRepository.findByActivoTrue(pageable);
    }

    public void desactivarEmpleado(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado con ID: " + id));
        empleado.setActivo(false);
        empleadoRepository.save(empleado);
    }

    public Empleado findByEmail(String email) {
        return empleadoRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con email: " + email));
    }



}

