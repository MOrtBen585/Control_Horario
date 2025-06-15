package BACK.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import BACK.repositories.CalendarioRepository;
import BACK.repositories.models.Calendario;

/**
 * The Class CalendarioMapperHelper.
 */
@Component
public class CalendarioMapperHelper {

    /** The calendario repository. */
    @Autowired
    private CalendarioRepository calendarioRepository;

    /**
     * Map.
     *
     * @param id the id
     * @return the calendario
     */
    public Calendario map(Long id) {
        if (id == null) return null;
        return calendarioRepository.findById(id).orElse(null);
    }
}
