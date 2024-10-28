package pl.tkaczyk.expensesservice.model.dto;

import jakarta.validation.constraints.NotNull;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.time.LocalDate;

public record ExpenseRequest(
        Long id,
        @NotNull(message = "Expense name is required")
        String name,
        ExpenseCategory expenseCategory,
        LocalDate expenseDate,
        String note,
        Long userId
) {
}
