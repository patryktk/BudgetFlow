package pl.tkaczyk.usersservice.model.dto;

import lombok.Builder;

@Builder
public record UserResponse(
    String firstName,
    String lastName,
    String email
) {
}
