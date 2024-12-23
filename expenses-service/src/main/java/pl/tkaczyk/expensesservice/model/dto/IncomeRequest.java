package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;
import pl.tkaczyk.expensesservice.model.IncomeCategory;

import java.time.LocalDate;

@Builder
public record IncomeRequest(
        Long id,
        String name,
        IncomeCategory incomeCategory,
        double amount,
        LocalDate incomeDate
) {
}
