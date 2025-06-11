package BACK.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@SuppressWarnings("ALL")
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors() // habilita CORS
                .and()
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // ✅ permite preflight
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        .requestMatchers("/ping").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/fichajes").hasAnyRole("ADMIN", "EMPLEADO")
                        .requestMatchers("/auth/whoami", "/auth/check", "/auth/role").authenticated()
                        .requestMatchers(HttpMethod.POST, "/auth/refresh").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/fichajes").hasAnyRole("EMPLEADO", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/fichajes/**").hasAnyRole("EMPLEADO", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/horarios/**").hasAnyRole("EMPLEADO", "ADMIN")
                        .requestMatchers("/api/empleados/**").hasRole("ADMIN")
                        .requestMatchers("/api/horarios/**").authenticated() // TODO cambiar restricción DESARROLLO
                        .requestMatchers("/api/calendarios/**").authenticated() // TODO cambiar restricción DESARROLLO
                        .requestMatchers("/api/equipos/**").hasRole("ADMIN")
                        .requestMatchers("/api/fichajes/**").hasRole("ADMIN")
                        .requestMatchers("/api/miperfil").hasRole("EMPLEADO")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
