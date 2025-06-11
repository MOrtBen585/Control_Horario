package BACK.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import BACK.dtos.request.HorarioRequestDto;
import BACK.dtos.response.HorarioResponseDto;
import BACK.mappers.HorarioMapper;
import BACK.repositories.HorarioRepository;
import BACK.repositories.models.Horario;

@Service
public class HorarioService {

    private final HorarioRepository repo;
    private final HorarioMapper mapper;

    public HorarioService(HorarioRepository repo, HorarioMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<HorarioResponseDto> findAll() {
        return repo.findAll().stream()
                   .map(mapper::toDto)
                   .collect(Collectors.toList());
    }

    public HorarioResponseDto findById(Long id) {
        Horario h = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Horario no encontrado: " + id));
        return mapper.toDto(h);
    }

    public HorarioResponseDto create(HorarioRequestDto dto) {
        Horario h = mapper.toEntity(dto);
        return mapper.toDto(repo.save(h));
    }

    public HorarioResponseDto update(Long id, HorarioRequestDto dto) {
        return repo.findById(id)
            .map(existing -> {
                Horario updated = mapper.toEntity(dto);
                updated.setId(id);
                return mapper.toDto(repo.save(updated));
            })
            .orElseThrow(() -> new RuntimeException("Horario no encontrado: " + id));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
