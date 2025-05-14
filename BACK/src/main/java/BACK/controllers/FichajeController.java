package BACK.controllers;

import BACK.dtos.FichajeDto;
import BACK.dtos.request.FichajeRequestDto;
import BACK.repositories.models.Fichaje;
import BACK.services.FichajeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fichajes")
public class FichajeController {

    private final FichajeService fichajeService;

    public FichajeController(FichajeService fichajeService) {
        this.fichajeService = fichajeService;
    }

    @PostMapping
    public ResponseEntity<Fichaje> registrarFichaje(@RequestBody FichajeRequestDto request) {
        Fichaje fichaje = fichajeService.registrarFichaje(request);
        return ResponseEntity.ok(fichaje);
    }

    @GetMapping
    public ResponseEntity<List<FichajeDto>> listarFichajesPropios(Authentication authentication) {
        return ResponseEntity.ok(fichajeService.obtenerFichajesDelUsuarioActual(authentication));
    }

    @GetMapping("/{fecha}")
    public ResponseEntity<List<Fichaje>> fichajesPorFecha(@PathVariable String fecha, Authentication authentication) {
        return ResponseEntity.ok(fichajeService.obtenerFichajesDelUsuarioPorFecha(authentication, fecha));
    }

    @GetMapping("/empleado/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Fichaje>> fichajesDeEmpleado(@PathVariable Long id) {
        return ResponseEntity.ok(fichajeService.obtenerFichajesPorEmpleado(id));
    }
}
