package pl.tkaczyk.groupsservice.model.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record GroupResponseWithUser(
        Long id,
        String name,
        String description,
        Long createdByUserId,
        List<UserResponse> usersData
) {
}
