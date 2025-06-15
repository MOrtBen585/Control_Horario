package BACK.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import BACK.dtos.CalendarioDto;
import BACK.mappers.CalendarioMapper;
import BACK.repositories.CalendarioRepository;
import BACK.repositories.models.Calendario;

/**
 * The Class CalendarioService.
 */
@Service
public class CalendarioService {

    /** The repository. */
    private final CalendarioRepository repository;
    
    /** The mapper. */
    private final CalendarioMapper mapper;

    /**
     * Instantiates a new calendario service.
     *
     * @param repository the repository
     * @param mapper the mapper
     */
    public CalendarioService(CalendarioRepository repository, CalendarioMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    /**
     * Find all.
     *
     * @return the list
     */
    public List<CalendarioDto> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Find by id.
     *
     * @param id the id
     * @return the optional
     */
    public Optional<CalendarioDto> findById(Long id) {
        return repository.findById(id).map(mapper::toDto);
    }

    /**
     * Creates the.
     *
     * @param dto the dto
     * @return the calendario dto
     */
    public CalendarioDto create(CalendarioDto dto) {
        Calendario calendario = mapper.toEntity(dto);
        return mapper.toDto(repository.save(calendario));
    }

    /**
     * Update.
     *
     * @param id the id
     * @param dto the dto
     * @return the calendario dto
     */
    public CalendarioDto update(Long id, CalendarioDto dto) {
        Calendario calendario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Calendario no encontrado"));
        calendario.setNombre(dto.getNombre());
        calendario.setDiasFestivos(dto.getDiasFestivos());
        return mapper.toDto(repository.save(calendario));
    }

    /**
     * Delete.
     *
     * @param id the id
     */
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
