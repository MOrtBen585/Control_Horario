package BACK.services;


import BACK.repositories.RefreshTokenRepository;
import BACK.repositories.models.RefreshToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository repo;

    public RefreshTokenService(RefreshTokenRepository repo) {
        this.repo = repo;
    }

    public RefreshToken createToken(String email) {
        repo.deleteByEmail(email); // solo uno por usuario (opcional)

        RefreshToken token = new RefreshToken();
        token.setEmail(email);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiration(Instant.now().plusSeconds(7 * 24 * 60 * 60)); // 7 días
        return repo.save(token);
    }

    public boolean isValid(String token) {
        return repo.findByToken(token)
                .filter(rt -> rt.getExpiration().isAfter(Instant.now()))
                .isPresent();
    }

    public String getEmail(String token) {
        return repo.findByToken(token).map(RefreshToken::getEmail).orElse(null);
    }

    public void deleteByEmail(String email) {
        repo.deleteByEmail(email);
    }
}
