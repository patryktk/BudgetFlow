package pl.tkaczyk.expensesservice.model.dto;

import java.util.Set;

public record  GroupResponse(
        boolean isInGroup,
        Long groupId,
        Set<Long> users
) {
}
