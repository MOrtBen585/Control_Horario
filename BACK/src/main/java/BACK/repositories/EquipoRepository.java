package BACK.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import BACK.repositories.models.Equipo;

/**
 * The Interface EquipoRepository.
 */
@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Long> {
}

