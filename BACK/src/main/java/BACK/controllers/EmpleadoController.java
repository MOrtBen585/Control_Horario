package BACK.controllers;

import BACK.dtos.EmpleadoDto;
import BACK.mappers.EmpleadoMapper;
import BACK.repositories.models.Empleado;
import BACK.services.EmpleadoService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
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
    public EmpleadoDto create(@RequestBody @Valid EmpleadoDto dto) {
        Empleado empleado = empleadoMapper.toEntity(dto);
        Empleado saved = empleadoService.save(empleado);
        return empleadoMapper.toDto(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoDto> update(@PathVariable Long id, @RequestBody @Valid EmpleadoDto dto) {
        Empleado updated = empleadoMapper.toEntity(dto);
        try {
            Empleado saved = empleadoService.update(id, updated);
            return ResponseEntity.ok(empleadoMapper.toDto(saved));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        empleadoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
