package BACK.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BACK.dtos.EmpleadoFichajeDto;
import BACK.dtos.FichajeDto;
import BACK.dtos.response.PaginatedResponse;
import BACK.repositories.models.Fichaje;
import BACK.services.FichajeService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/fichajes")
@PreAuthorize("hasRole('ADMIN')")
public class FichajeController {

    private final FichajeService fichajeService;

    public FichajeController(FichajeService fichajeService) {
        this.fichajeService = fichajeService;
    }

    @PreAuthorize("hasRole('EMPLEADO')")
    @PostMapping
    public ResponseEntity<Fichaje> registrarFichaje(@RequestBody @Valid FichajeDto dto) {
        Fichaje saved = fichajeService.registrarFichaje(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<FichajeDto>> listarFichajesPropios(Authentication auth, Pageable pageable) {
        Page<FichajeDto> page = fichajeService.obtenerFichajesDelUsuarioActual(auth, pageable);
        return ResponseEntity.ok(PaginatedResponse.buildPaginatedResponse(page));
    }

    @GetMapping("/{fecha}")
    public ResponseEntity<PaginatedResponse<FichajeDto>> fichajesPorFecha(@PathVariable String fecha, Authentication auth, Pageable pageable) {
        Page<FichajeDto> page = fichajeService.obtenerFichajesDelUsuarioPorFecha(auth, fecha, pageable);
        return ResponseEntity.ok(PaginatedResponse.buildPaginatedResponse(page));
    }

    @GetMapping("/empleado/{id}")
    public ResponseEntity<PaginatedResponse<FichajeDto>> fichajesDeEmpleado(@PathVariable Long id, Pageable pageable) {
        Page<FichajeDto> page = fichajeService.obtenerFichajesPorEmpleado(id, pageable);
        return ResponseEntity.ok(PaginatedResponse.buildPaginatedResponse(page));
    }

    @GetMapping("/all")
    public ResponseEntity<PaginatedResponse<FichajeDto>> obtenerTodosLosFichajes(Pageable pageable) {
        Page<FichajeDto> page = fichajeService.obtenerTodos(pageable);
        return ResponseEntity.ok(PaginatedResponse.buildPaginatedResponse(page));
    }

    @GetMapping("/activos")
    public ResponseEntity<PaginatedResponse<FichajeDto>> getFichajesActivos(Pageable pageable) {
        Page<FichajeDto> page = fichajeService.getFichajesDeEmpleadosActivos(pageable);
        return ResponseEntity.ok(PaginatedResponse.buildPaginatedResponse(page));
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLEADO')")
    @GetMapping("/activos/list")
    public ResponseEntity<List<FichajeDto>> getFichajesActivosSinPaginacion() {
        return ResponseEntity.ok(fichajeService.getAllActives());
    }


    @PreAuthorize("hasRole('EMPLEADO')")
    @GetMapping("/info/{empleadoId}")
    public ResponseEntity<EmpleadoFichajeDto> getInfoParaFichar(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(fichajeService.getInfoParaFichar(empleadoId));
    }

}
