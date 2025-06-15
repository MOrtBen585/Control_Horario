package BACK.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import BACK.repositories.models.Empleado;

/**
 * The Interface EmpleadoRepository.
 */
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    /**
     * Find by email.
     *
     * @param email the email
     * @return the optional
     */
    Optional<Empleado> findByEmail(String email);

    /**
     * Find by activo true.
     *
     * @param pageable the pageable
     * @return the page
     */
    Page<Empleado> findByActivoTrue(Pageable pageable);

}

