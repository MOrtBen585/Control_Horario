
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

/**
 * The Class CalendarioController.
 */
@RestController
@RequestMapping("/api/calendarios")
public class CalendarioController {

 /** The service. */
 private final CalendarioService service;

 /**
  * Instantiates a new calendario controller.
  *
  * @param service the service
  */
 public CalendarioController(CalendarioService service) {
     this.service = service;
 }

 /**
  * Gets the all.
  *
  * @return the all
  */
 @GetMapping
 public ResponseEntity<List<CalendarioDto>> getAll() {
     return ResponseEntity.ok(service.findAll());
 }

 /**
  * Gets the by id.
  *
  * @param id the id
  * @return the by id
  */
 @GetMapping("/{id}")
 public ResponseEntity<CalendarioDto> getById(@PathVariable Long id) {
     return service.findById(id)
             .map(ResponseEntity::ok)
             .orElse(ResponseEntity.notFound().build());
 }

 /**
  * Creates the.
  *
  * @param dto the dto
  * @return the response entity
  */
 @PostMapping
 public ResponseEntity<CalendarioDto> create(@RequestBody CalendarioDto dto) {
     return ResponseEntity.ok(service.create(dto));
 }

 /**
  * Update.
  *
  * @param id the id
  * @param dto the dto
  * @return the response entity
  */
 @PutMapping("/{id}")
 public ResponseEntity<CalendarioDto> update(@PathVariable Long id, @RequestBody CalendarioDto dto) {
     return ResponseEntity.ok(service.update(id, dto));
 }

 /**
  * Delete.
  *
  * @param id the id
  * @return the response entity
  */
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> delete(@PathVariable Long id) {
     service.delete(id);
     return ResponseEntity.noContent().build();
 }
}
