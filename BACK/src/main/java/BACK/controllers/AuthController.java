package BACK.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BACK.dtos.request.AuthRequestDto;
import BACK.dtos.response.AuthResponseDto;
import BACK.repositories.models.Empleado;
import BACK.security.JwtUtil;
import BACK.services.EmpleadoService;
import BACK.services.RefreshTokenService;


/**
 * The Class AuthController.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    /** The authentication manager. */
    private final AuthenticationManager authenticationManager;
    
    /** The jwt util. */
    private final JwtUtil jwtUtil;
    
    /** The refresh token service. */
    private final RefreshTokenService refreshTokenService;
    
    /** The emplado service. */
    private final EmpleadoService empladoService;

    /**
     * Instantiates a new auth controller.
     *
     * @param authenticationManager the authentication manager
     * @param jwtUtil the jwt util
     * @param refreshTokenService the refresh token service
     * @param empladoService the emplado service
     */
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, RefreshTokenService refreshTokenService, EmpleadoService empladoService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
        this.empladoService = empladoService;
    }

    /**
     * Logout.
     *
     * @param auth the auth
     * @return the response entity
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication auth) {
        refreshTokenService.deleteByEmail(auth.getName());
        return ResponseEntity.ok(Map.of("message", "Sesión cerrada"));
    }


    /**
     * Login.
     *
     * @param authRequest the auth request
     * @return the auth response dto
     */
    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody AuthRequestDto authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        UserDetails user = (UserDetails) authentication.getPrincipal();
        String role = user.getAuthorities().stream().findFirst()
                .map(auth -> auth.getAuthority().replace("ROLE_", ""))
                .orElse("USER");

        String accessToken = jwtUtil.generateToken(authRequest.getEmail(), role);
        String refreshToken = jwtUtil.generateRefreshToken(authRequest.getEmail()); // ahora lo hacemos
        System.out.println("🔑 Acceso válido para: " + authRequest.getEmail());
        return new AuthResponseDto(accessToken, refreshToken);
    }

    /**
     * Refresh token.
     *
     * @param body the body
     * @return the response entity
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");

        if (!refreshTokenService.isValid(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Refresh token inválido o expirado"));
        }

        String email = refreshTokenService.getEmail(refreshToken);
        String role = jwtUtil.extractRole(refreshToken); // si tu token lleva el rol

        String newAccessToken = jwtUtil.generateToken(email, role);
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }


    /**
     * Whoami.
     *
     * @param authentication the authentication
     * @return the map
     */
    @GetMapping("/whoami")
    public Map<String, Object> whoami(Authentication authentication) {
        String email = authentication.getName();

        Empleado empleado = empladoService.findByEmail(email);

        Map<String, Object> info = new HashMap<>();
        info.put("id", empleado.getId());
        info.put("email", empleado.getEmail());
        info.put("rol", authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("SIN_ROL"));
        return info;
    }


    /**
     * Debug auth.
     *
     * @param authentication the authentication
     * @return the map
     */
    @GetMapping("/debug")
    public Map<String, Object> debugAuth(Authentication authentication) {
        Map<String, Object> info = new HashMap<>();

        if (authentication == null) {
            info.put("estado", "No autenticado");
        } else {
            info.put("estado", "Autenticado ✅");
            info.put("usuario", authentication.getName());
            info.put("roles", authentication.getAuthorities().stream()
                    .map(Object::toString)
                    .toList());
            info.put("clase", authentication.getClass().getSimpleName());
            info.put("tipo_token", authentication.getCredentials() == null ? "JWT" : authentication.getCredentials().getClass().getSimpleName());
        }

        return info;
    }


    /**
     * Check token.
     *
     * @return the response entity
     */
    @GetMapping("/check")
    public ResponseEntity<String> checkToken() {
        return ResponseEntity.ok("Token válido ✅");
    }

    /**
     * Gets the rol.
     *
     * @param authentication the authentication
     * @return the rol
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/role")
    public Map<String, String> getRol(Authentication authentication) {
        String rol = authentication.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("SIN_ROL");

        return Map.of("role", rol); // clave 'role' esperada por Angular
    }



}
