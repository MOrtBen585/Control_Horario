package BACK.dtos.request;

import lombok.Data;

/**
 * The Class AuthRequestDto.
 */
@Data
public class AuthRequestDto {
    
    /** The email. */
    private String email;
    
    /** The password. */
    private String password;
}
