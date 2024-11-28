package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record IncomeRequest(
        Long id,
        String name,
        double amount,
        LocalDate incomeDate
) {
}
