package BACK.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BACK.repositories.models.Horario;

public interface HorarioRepository extends JpaRepository<Horario, Long> {
}
