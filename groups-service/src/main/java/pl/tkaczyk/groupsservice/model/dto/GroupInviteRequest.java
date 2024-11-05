package pl.tkaczyk.groupsservice.model.dto;

import lombok.Builder;

@Builder
public record GroupInviteRequest(
        String userEmail,
        Long groupId
) {
}
