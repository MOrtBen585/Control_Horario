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

/**
 * The Class EmpleadoService.
 */
@Service
public class EmpleadoService {

    /** The empleado repository. */
    private final EmpleadoRepository empleadoRepository;
    
    /** The empleado mapper. */
    private final EmpleadoMapper empleadoMapper;

    /**
     * Instantiates a new empleado service.
     *
     * @param empleadoRepository the empleado repository
     * @param empleadoMapper the empleado mapper
     */
    @Autowired
    public EmpleadoService(EmpleadoRepository empleadoRepository, EmpleadoMapper empleadoMapper) {
        this.empleadoRepository = empleadoRepository;
        this.empleadoMapper = empleadoMapper;
    }

    /**
     * Find all.
     *
     * @return the list
     */
    public List<Empleado> findAll() {
        return empleadoRepository.findAll();
    }

    /**
     * Find by id.
     *
     * @param id the id
     * @return the optional
     */
    public Optional<Empleado> findById(Long id) {
        return empleadoRepository.findById(id);
    }

    /**
     * Save.
     *
     * @param empleado the empleado
     * @return the empleado
     */
    public Empleado save(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    /**
     * Update.
     *
     * @param id the id
     * @param updatedEmpleadoDto the updated empleado dto
     * @return the empleado dto
     */
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


    /**
     * Delete.
     *
     * @param id the id
     */
    public void delete(Long id) {
        empleadoRepository.deleteById(id);
    }

    /**
     * Find all activos.
     *
     * @param pageable the pageable
     * @return the page
     */
    public Page<Empleado> findAllActivos(Pageable pageable) {
        return empleadoRepository.findByActivoTrue(pageable);
    }

    /**
     * Desactivar empleado.
     *
     * @param id the id
     */
    public void desactivarEmpleado(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado con ID: " + id));
        empleado.setActivo(false);
        empleadoRepository.save(empleado);
    }

    /**
     * Find by email.
     *
     * @param email the email
     * @return the empleado
     */
    public Empleado findByEmail(String email) {
        return empleadoRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con email: " + email));
    }



}

