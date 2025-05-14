package BACK.security;

import BACK.repositories.EmpleadoRepository;
import BACK.repositories.models.Empleado;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final EmpleadoRepository empleadoRepository;

    public UserDetailsServiceImpl(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

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
