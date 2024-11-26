package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record StatisticsByMonthRequest(
        LocalDate startDate,
        LocalDate endDate
) {
}
