
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

import BACK.dtos.CalendarioDto;
import BACK.services.CalendarioService;

@RestController
@RequestMapping("/api/calendarios")
public class CalendarioController {

 private final CalendarioService service;

 public CalendarioController(CalendarioService service) {
     this.service = service;
 }

 @GetMapping
 public ResponseEntity<List<CalendarioDto>> getAll() {
     return ResponseEntity.ok(service.findAll());
 }

 @GetMapping("/{id}")
 public ResponseEntity<CalendarioDto> getById(@PathVariable Long id) {
     return service.findById(id)
             .map(ResponseEntity::ok)
             .orElse(ResponseEntity.notFound().build());
 }

 @PostMapping
 public ResponseEntity<CalendarioDto> create(@RequestBody CalendarioDto dto) {
     return ResponseEntity.ok(service.create(dto));
 }

 @PutMapping("/{id}")
 public ResponseEntity<CalendarioDto> update(@PathVariable Long id, @RequestBody CalendarioDto dto) {
     return ResponseEntity.ok(service.update(id, dto));
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Void> delete(@PathVariable Long id) {
     service.delete(id);
     return ResponseEntity.noContent().build();
 }
}
