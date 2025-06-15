package BACK.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import BACK.repositories.models.Fichaje;

/**
 * The Interface FichajeRepository.
 */
public interface FichajeRepository extends JpaRepository<Fichaje, Long> {

    /**
     * Find by empleado id.
     *
     * @param empleadoId the empleado id
     * @param pageable the pageable
     * @return the page
     */
    Page<Fichaje> findByEmpleadoId(Long empleadoId, Pageable pageable);

    /**
     * Find by empleado id and fecha.
     *
     * @param empleadoId the empleado id
     * @param fecha the fecha
     * @param pageable the pageable
     * @return the page
     */
    Page<Fichaje> findByEmpleadoIdAndFecha(Long empleadoId, String fecha, Pageable pageable);

    /**
     * Find by empleado activo true.
     *
     * @param pageable the pageable
     * @return the page
     */
    Page<Fichaje> findByEmpleado_ActivoTrue(Pageable pageable);

    /**
     * Find top by empleado id order by fecha desc.
     *
     * @param empleadoId the empleado id
     * @return the optional
     */
    Optional<Fichaje> findTopByEmpleadoIdOrderByFechaDesc(Long empleadoId);
    
    /**
     * Find by empleado activo true.
     *
     * @return the list
     */
    List<Fichaje> findByEmpleado_ActivoTrue();

}
