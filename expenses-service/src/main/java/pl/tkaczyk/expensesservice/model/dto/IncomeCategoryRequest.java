package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record IncomeCategoryRequest(
        Long id,
        String name
) {

}
