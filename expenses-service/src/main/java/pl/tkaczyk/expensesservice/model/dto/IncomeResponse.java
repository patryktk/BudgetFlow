package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record IncomeResponse(
        Long id,
        String name,
        double amount,
        LocalDate incomeDate,
        Long userId
) {
}
