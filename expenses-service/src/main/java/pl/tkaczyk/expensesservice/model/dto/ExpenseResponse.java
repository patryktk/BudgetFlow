package pl.tkaczyk.expensesservice.model.dto;

import lombok.Builder;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record ExpenseResponse(
        Long id,
        String name,
        ExpenseCategory expenseCategory,
        double amount,
        LocalDate expenseDate,
        String note,
        Long userId,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {
}
