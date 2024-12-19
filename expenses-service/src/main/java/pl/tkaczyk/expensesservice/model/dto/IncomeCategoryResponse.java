package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record IncomeCategoryResponse(
        Long id,
        String name
) {
}
