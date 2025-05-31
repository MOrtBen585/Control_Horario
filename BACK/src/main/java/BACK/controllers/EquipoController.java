package BACK.controllers;

import BACK.dtos.EquipoDto;
import BACK.mappers.EquipoMapper;
import BACK.repositories.models.Equipo;
import BACK.services.EquipoService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/equipos")
@PreAuthorize("hasRole('ADMIN')")
public class EquipoController {

    private final EquipoService equipoService;
    private final EquipoMapper equipoMapper;

    public EquipoController(EquipoService equipoService, EquipoMapper equipoMapper) {
        this.equipoService = equipoService;
        this.equipoMapper = equipoMapper;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<EquipoDto> getAll() {
        return equipoService.findAll().stream()
                .map(equipoMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipoDto> getById(@PathVariable Long id) {
        return equipoService.findById(id)
                .map(equipoMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EquipoDto create(@RequestBody @Valid EquipoDto dto) {
        Equipo equipo = equipoMapper.toEntity(dto);
        Equipo saved = equipoService.save(equipo);
        return equipoMapper.toDto(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipoDto> update(@PathVariable Long id, @RequestBody @Valid EquipoDto dto) {
        Equipo updated = equipoMapper.toEntity(dto);
        try {
            Equipo saved = equipoService.update(id, updated);
            return ResponseEntity.ok(equipoMapper.toDto(saved));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        equipoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

