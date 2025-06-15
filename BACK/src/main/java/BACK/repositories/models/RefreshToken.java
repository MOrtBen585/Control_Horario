package BACK.repositories.models;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * The Class RefreshToken.
 */
@Data
@Entity
public class RefreshToken {

    /** The id. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The token. */
    @Column(nullable = false, unique = true)
    private String token;

    /** The email. */
    @Column(nullable = false)
    private String email;

    /** The expiration. */
    @Column(nullable = false)
    private Instant expiration;

    // Getters y setters
}
