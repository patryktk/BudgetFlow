package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record SumResponse(
        double sum
) {
}
