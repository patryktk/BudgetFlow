package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record ExpenseStatisticsResponse(
        String categoryName,
        String amount,
        String percentageToAverage
) {
}
