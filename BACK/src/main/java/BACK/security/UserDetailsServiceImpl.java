package BACK.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import BACK.repositories.EmpleadoRepository;
import BACK.repositories.models.Empleado;

/**
 * The Class UserDetailsServiceImpl.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    /** The empleado repository. */
    private final EmpleadoRepository empleadoRepository;

    /**
     * Instantiates a new user details service impl.
     *
     * @param empleadoRepository the empleado repository
     */
    public UserDetailsServiceImpl(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    /**
     * Load user by username.
     *
     * @param email the email
     * @return the user details
     * @throws UsernameNotFoundException the username not found exception
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Empleado empleado = empleadoRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No se encontró usuario con email: " + email));

        System.out.println("🧾 Usuario: " + empleado.getEmail() + " → Rol: " + empleado.getRol());

        return org.springframework.security.core.userdetails.User
                .withUsername(empleado.getEmail())
                .password(empleado.getPassword())
                .roles(empleado.getRol()) // ← ¡Aquí usamos el rol!
                .build();
    }
}
