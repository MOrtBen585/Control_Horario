package BACK.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BACK.dtos.request.HorarioRequestDto;
import BACK.dtos.response.HorarioResponseDto;
import BACK.services.HorarioService;

@RestController
@RequestMapping("/api/horarios")
public class HorarioController {

    private final HorarioService service;

    public HorarioController(HorarioService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<HorarioResponseDto>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorarioResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<HorarioResponseDto> create(@RequestBody HorarioRequestDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorarioResponseDto> update(@PathVariable Long id,
                                                     @RequestBody HorarioRequestDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
