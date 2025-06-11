package BACK.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import BACK.repositories.HorarioRepository;
import BACK.repositories.models.Horario;

@Component
public class HorarioMapperHelper {

    @Autowired
    private HorarioRepository horarioRepository;

    public Horario fromId(Long id) {
        if (id == null) return null;
        return horarioRepository.findById(id).orElse(null);
    }
}
