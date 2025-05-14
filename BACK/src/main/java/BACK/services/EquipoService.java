package BACK.services;

import BACK.repositories.EquipoRepository;
import BACK.repositories.models.Equipo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class EquipoService {

    private final EquipoRepository equipoRepository;

    @Autowired
    public EquipoService(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }

    public List<Equipo> findAll() {
        return equipoRepository.findAll();
    }

    public Optional<Equipo> findById(Long id) {
        return equipoRepository.findById(id);
    }

    public Equipo save(Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    public Equipo update(Long id, Equipo updatedEquipo) {
        return equipoRepository.findById(id)
                .map(e -> {
                    updatedEquipo.setId(id);
                    return equipoRepository.save(updatedEquipo);
                })
                .orElseThrow(() -> new RuntimeException("Equipo no encontrado con id " + id));
    }

    public void delete(Long id) {
        equipoRepository.deleteById(id);
    }
}
