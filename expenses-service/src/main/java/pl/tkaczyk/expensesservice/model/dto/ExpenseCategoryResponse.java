package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record ExpenseCategoryResponse(
        Long id,
        String name,
        Long createdByUserId,
        String hexColor
) {
}
