package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record ResponseForStatistics(
    String name,
    double amount,
    double averageValue
) {
}
