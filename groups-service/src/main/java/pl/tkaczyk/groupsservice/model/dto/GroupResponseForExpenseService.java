package pl.tkaczyk.groupsservice.model.dto;

import lombok.Builder;

import java.util.Set;

@Builder
public record GroupResponseForExpenseService(
        boolean isInGroup,
        Long groupId,
        Set<Long> users
) {
}
