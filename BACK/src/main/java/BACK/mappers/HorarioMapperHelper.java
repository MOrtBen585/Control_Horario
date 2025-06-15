package BACK.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import BACK.repositories.HorarioRepository;
import BACK.repositories.models.Horario;

/**
 * The Class HorarioMapperHelper.
 */
@Component
public class HorarioMapperHelper {

    /** The horario repository. */
    @Autowired
    private HorarioRepository horarioRepository;

    /**
     * From id.
     *
     * @param id the id
     * @return the horario
     */
    public Horario fromId(Long id) {
        if (id == null) return null;
        return horarioRepository.findById(id).orElse(null);
    }
}
