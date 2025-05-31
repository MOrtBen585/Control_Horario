package BACK.repositories;

import BACK.repositories.models.Fichaje;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FichajeRepository extends JpaRepository<Fichaje, Long> {

    Page<Fichaje> findByEmpleadoId(Long empleadoId, Pageable pageable);

    Page<Fichaje> findByEmpleadoIdAndFecha(Long empleadoId, String fecha, Pageable pageable);

    Page<Fichaje> findByEmpleado_ActivoTrue(Pageable pageable);

    Optional<Fichaje> findTopByEmpleadoIdOrderByFechaDesc(Long empleadoId);

}
