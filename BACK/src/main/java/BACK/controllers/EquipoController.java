package BACK.controllers;

import java.util.List;
import java.util.stream.Collectors;

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

import BACK.dtos.EquipoDto;
import BACK.mappers.EquipoMapper;
import BACK.repositories.models.Equipo;
import BACK.services.EquipoService;
import jakarta.validation.Valid;


/**
 * The Class EquipoController.
 */
@RestController
@RequestMapping("/api/equipos")
@PreAuthorize("hasRole('ADMIN')")
public class EquipoController {

    /** The equipo service. */
    private final EquipoService equipoService;
    
    /** The equipo mapper. */
    private final EquipoMapper equipoMapper;

    /**
     * Instantiates a new equipo controller.
     *
     * @param equipoService the equipo service
     * @param equipoMapper the equipo mapper
     */
    public EquipoController(EquipoService equipoService, EquipoMapper equipoMapper) {
        this.equipoService = equipoService;
        this.equipoMapper = equipoMapper;
    }
    
    /**
     * Gets the all.
     *
     * @return the all
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<EquipoDto> getAll() {
        return equipoService.findAll().stream()
                .map(equipoMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Gets the by id.
     *
     * @param id the id
     * @return the by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<EquipoDto> getById(@PathVariable Long id) {
        return equipoService.findById(id)
                .map(equipoMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Creates the.
     *
     * @param dto the dto
     * @return the equipo dto
     */
    @PostMapping
    public EquipoDto create(@RequestBody @Valid EquipoDto dto) {
        Equipo equipo = equipoMapper.toEntity(dto);
        Equipo saved = equipoService.save(equipo);
        return equipoMapper.toDto(saved);
    }

    /**
     * Update.
     *
     * @param id the id
     * @param dto the dto
     * @return the response entity
     */
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

    /**
     * Delete.
     *
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        equipoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

