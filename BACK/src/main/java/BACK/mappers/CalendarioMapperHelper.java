package BACK.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import BACK.repositories.CalendarioRepository;
import BACK.repositories.models.Calendario;

@Component
public class CalendarioMapperHelper {

    @Autowired
    private CalendarioRepository calendarioRepository;

    public Calendario map(Long id) {
        if (id == null) return null;
        return calendarioRepository.findById(id).orElse(null);
    }
}
