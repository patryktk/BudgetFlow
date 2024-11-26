package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record ExpenseResponseForStatistics(
    String name,
    double amount,
    double averageAmount
) {
}
