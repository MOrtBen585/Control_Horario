package BACK.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import BACK.repositories.models.RefreshToken;

/**
 * The Interface RefreshTokenRepository.
 */
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    /**
     * Find by token.
     *
     * @param token the token
     * @return the optional
     */
    Optional<RefreshToken> findByToken(String token);
    
    /**
     * Delete by email.
     *
     * @param email the email
     */
    void deleteByEmail(String email);
}

