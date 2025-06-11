package BACK.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import BACK.repositories.models.Fichaje;

public interface FichajeRepository extends JpaRepository<Fichaje, Long> {

    Page<Fichaje> findByEmpleadoId(Long empleadoId, Pageable pageable);

    Page<Fichaje> findByEmpleadoIdAndFecha(Long empleadoId, String fecha, Pageable pageable);

    Page<Fichaje> findByEmpleado_ActivoTrue(Pageable pageable);

    Optional<Fichaje> findTopByEmpleadoIdOrderByFechaDesc(Long empleadoId);
    
    List<Fichaje> findByEmpleado_ActivoTrue();

}
