package BACK.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import BACK.dtos.CalendarioDto;
import BACK.mappers.CalendarioMapper;
import BACK.repositories.CalendarioRepository;
import BACK.repositories.models.Calendario;

@Service
public class CalendarioService {

    private final CalendarioRepository repository;
    private final CalendarioMapper mapper;

    public CalendarioService(CalendarioRepository repository, CalendarioMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<CalendarioDto> findAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<CalendarioDto> findById(Long id) {
        return repository.findById(id).map(mapper::toDto);
    }

    public CalendarioDto create(CalendarioDto dto) {
        Calendario calendario = mapper.toEntity(dto);
        return mapper.toDto(repository.save(calendario));
    }

    public CalendarioDto update(Long id, CalendarioDto dto) {
        Calendario calendario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Calendario no encontrado"));
        calendario.setNombre(dto.getNombre());
        calendario.setDiasFestivos(dto.getDiasFestivos());
        return mapper.toDto(repository.save(calendario));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
