package BACK.dtos.response;

import lombok.Data;

/**
 * The Class AuthResponseDto.
 */
@Data
public class AuthResponseDto {
    
    /** The access token. */
    private String accessToken;
    
    /** The refresh token. */
    private String refreshToken;

    /**
     * Instantiates a new auth response dto.
     *
     * @param accessToken the access token
     * @param refreshToken the refresh token
     */
    public AuthResponseDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
