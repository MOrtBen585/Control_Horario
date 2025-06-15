package BACK.services;


import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;

import BACK.repositories.RefreshTokenRepository;
import BACK.repositories.models.RefreshToken;

/**
 * The Class RefreshTokenService.
 */
@Service
public class RefreshTokenService {

    /** The repo. */
    private final RefreshTokenRepository repo;

    /**
     * Instantiates a new refresh token service.
     *
     * @param repo the repo
     */
    public RefreshTokenService(RefreshTokenRepository repo) {
        this.repo = repo;
    }

    /**
     * Creates the token.
     *
     * @param email the email
     * @return the refresh token
     */
    public RefreshToken createToken(String email) {
        repo.deleteByEmail(email); // solo uno por usuario (opcional)

        RefreshToken token = new RefreshToken();
        token.setEmail(email);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiration(Instant.now().plusSeconds(7 * 24 * 60 * 60)); // 7 días
        return repo.save(token);
    }

    /**
     * Checks if is valid.
     *
     * @param token the token
     * @return true, if is valid
     */
    public boolean isValid(String token) {
        return repo.findByToken(token)
                .filter(rt -> rt.getExpiration().isAfter(Instant.now()))
                .isPresent();
    }

    /**
     * Gets the email.
     *
     * @param token the token
     * @return the email
     */
    public String getEmail(String token) {
        return repo.findByToken(token).map(RefreshToken::getEmail).orElse(null);
    }

    /**
     * Delete by email.
     *
     * @param email the email
     */
    public void deleteByEmail(String email) {
        repo.deleteByEmail(email);
    }
}
