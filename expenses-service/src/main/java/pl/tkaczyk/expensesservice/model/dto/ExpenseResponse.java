package pl.tkaczyk.expensesservice.model.dto;

import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ExpenseResponse(
        Long id,
        String name,
        ExpenseCategory expenseCategory,
        LocalDate expenseDate,
        String note,
        Long userId,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate
) {
}
