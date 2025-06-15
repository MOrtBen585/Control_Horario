package BACK.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * The Class JwtUtil.
 */
@Component
public class JwtUtil {

    /** The secret. */
    private final String SECRET = "esta_es_mi_contrasena_supersecreta"; // al menos 256 bits
    
    /** The expiration ms. */
    private final long EXPIRATION_MS = 86400000; // 1 día

    /**
     * Gets the key.
     *
     * @return the key
     */
    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    /**
     * Generate token.
     *
     * @param username the username
     * @param role the role
     * @return the string
     */
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extract role.
     *
     * @param token the token
     * @return the string
     */
    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }


    /**
     * Extract username.
     *
     * @param token the token
     * @return the string
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validate token.
     *
     * @param token the token
     * @return true, if successful
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    /**
     * Generate refresh token.
     *
     * @param username the username
     * @return the string
     */
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000)) // 7 días
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }


}
