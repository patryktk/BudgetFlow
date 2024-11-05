package pl.tkaczyk.groupsservice.model.dto;

import lombok.Builder;

import java.util.Set;

@Builder
public record GroupResponse(
    Long id,
    String name,
    String description,
    Long createdByUserId,
    Set<Long> users
) {
}
