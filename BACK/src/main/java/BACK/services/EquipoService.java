package BACK.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BACK.repositories.EquipoRepository;
import BACK.repositories.models.Equipo;

/**
 * The Class EquipoService.
 */
@Service
public class EquipoService {

    /** The equipo repository. */
    private final EquipoRepository equipoRepository;

    /**
     * Instantiates a new equipo service.
     *
     * @param equipoRepository the equipo repository
     */
    @Autowired
    public EquipoService(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }

    /**
     * Find all.
     *
     * @return the list
     */
    public List<Equipo> findAll() {
        return equipoRepository.findAll();
    }

    /**
     * Find by id.
     *
     * @param id the id
     * @return the optional
     */
    public Optional<Equipo> findById(Long id) {
        return equipoRepository.findById(id);
    }

    /**
     * Save.
     *
     * @param equipo the equipo
     * @return the equipo
     */
    public Equipo save(Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    /**
     * Update.
     *
     * @param id the id
     * @param updatedEquipo the updated equipo
     * @return the equipo
     */
    public Equipo update(Long id, Equipo updatedEquipo) {
        return equipoRepository.findById(id)
                .map(e -> {
                    updatedEquipo.setId(id);
                    return equipoRepository.save(updatedEquipo);
                })
                .orElseThrow(() -> new RuntimeException("Equipo no encontrado con id " + id));
    }

    /**
     * Delete.
     *
     * @param id the id
     */
    public void delete(Long id) {
        equipoRepository.deleteById(id);
    }
}
