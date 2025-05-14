package BACK.repositories;

import BACK.repositories.models.Fichaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FichajeRepository extends JpaRepository<Fichaje, Long> {
    List<Fichaje> findByEmpleadoId(Long empleadoId);
    List<Fichaje> findByEmpleadoIdAndFecha(Long empleadoId, String fecha);

}
