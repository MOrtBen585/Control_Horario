package BACK.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * The Class PasswordGenerator.
 */
public class PasswordGenerator {
    
    /**
     * The main method.
     *
     * @param args the arguments
     */
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println(encoder.encode("123")); // puedes cambiar la clave
    }
}
