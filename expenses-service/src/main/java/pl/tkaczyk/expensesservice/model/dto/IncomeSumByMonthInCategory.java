package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

@Builder
public record IncomeSumByMonthInCategory(
        Long id,
        String name,
        Double sumByCategoryInMonth,
        String month,
        Double averageSumByCategoryInMonth
) {
}
