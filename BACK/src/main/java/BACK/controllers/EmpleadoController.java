package BACK.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BACK.dtos.EmpleadoDto;
import BACK.dtos.response.PaginatedResponse;
import BACK.mappers.EmpleadoMapper;
import BACK.repositories.models.Empleado;
import BACK.services.EmpleadoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/empleados")
@PreAuthorize("hasRole('ADMIN')")
public class EmpleadoController {

    private final EmpleadoService empleadoService;
    private final EmpleadoMapper empleadoMapper;

    public EmpleadoController(EmpleadoService empleadoService, EmpleadoMapper empleadoMapper) {
        this.empleadoService = empleadoService;
        this.empleadoMapper = empleadoMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<EmpleadoDto> getAll() {
        return empleadoService.findAll().stream()
                .map(empleadoMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpleadoDto> getById(@PathVariable Long id) {
        return empleadoService.findById(id)
                .map(empleadoMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EmpleadoDto> create(@RequestBody @Valid EmpleadoDto empleadoDto) {
        Empleado empleado = empleadoMapper.toEntity(empleadoDto);
        Empleado saved = empleadoService.save(empleado);
        EmpleadoDto savedDto = empleadoMapper.toDto(saved);
        return ResponseEntity.ok(savedDto);
    }


    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoDto> update(@PathVariable Long id, @RequestBody @Valid EmpleadoDto empleadoDto) {
        try {
            EmpleadoDto updated = empleadoService.update(id, empleadoDto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desactivarEmpleado(@PathVariable Long id) {
        empleadoService.desactivarEmpleado(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/paged")
    public ResponseEntity<PaginatedResponse<EmpleadoDto>> getAllActivos(Pageable pageable) {
        Page<EmpleadoDto> page = empleadoService.findAllActivos(pageable)
                .map(empleadoMapper::toDto);

        return ResponseEntity.ok(PaginatedResponse.buildPaginatedResponse(page));
    }



    @GetMapping("/test-empleados")
    public List<Empleado> test() {
        return empleadoService.findAll();
    }

}
