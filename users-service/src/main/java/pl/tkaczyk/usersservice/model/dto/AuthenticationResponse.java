package pl.tkaczyk.usersservice.model.dto;

import lombok.Builder;

@Builder
public record AuthenticationResponse(
        String token
) {
}
