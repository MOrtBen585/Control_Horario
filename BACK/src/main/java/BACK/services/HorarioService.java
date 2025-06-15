package BACK.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import BACK.dtos.request.HorarioRequestDto;
import BACK.dtos.response.HorarioResponseDto;
import BACK.mappers.HorarioMapper;
import BACK.repositories.HorarioRepository;
import BACK.repositories.models.Horario;

/**
 * The Class HorarioService.
 */
@Service
public class HorarioService {

    /** The repo. */
    private final HorarioRepository repo;
    
    /** The mapper. */
    private final HorarioMapper mapper;

    /**
     * Instantiates a new horario service.
     *
     * @param repo the repo
     * @param mapper the mapper
     */
    public HorarioService(HorarioRepository repo, HorarioMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    /**
     * Find all.
     *
     * @return the list
     */
    public List<HorarioResponseDto> findAll() {
        return repo.findAll().stream()
                   .map(mapper::toDto)
                   .collect(Collectors.toList());
    }

    /**
     * Find by id.
     *
     * @param id the id
     * @return the horario response dto
     */
    public HorarioResponseDto findById(Long id) {
        Horario h = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Horario no encontrado: " + id));
        return mapper.toDto(h);
    }

    /**
     * Creates the.
     *
     * @param dto the dto
     * @return the horario response dto
     */
    public HorarioResponseDto create(HorarioRequestDto dto) {
        Horario h = mapper.toEntity(dto);
        return mapper.toDto(repo.save(h));
    }

    /**
     * Update.
     *
     * @param id the id
     * @param dto the dto
     * @return the horario response dto
     */
    public HorarioResponseDto update(Long id, HorarioRequestDto dto) {
        return repo.findById(id)
            .map(existing -> {
                Horario updated = mapper.toEntity(dto);
                updated.setId(id);
                return mapper.toDto(repo.save(updated));
            })
            .orElseThrow(() -> new RuntimeException("Horario no encontrado: " + id));
    }

    /**
     * Delete.
     *
     * @param id the id
     */
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
