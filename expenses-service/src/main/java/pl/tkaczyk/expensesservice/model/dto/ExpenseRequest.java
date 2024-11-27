package pl.tkaczyk.expensesservice.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.time.LocalDate;

public record ExpenseRequest(
        Long id,
        @NotEmpty(message = "Expense name is required")
        @NotBlank(message = "Expense name is required")
        String name,
        ExpenseCategory expenseCategory,
        double amount,
        LocalDate expenseDate,
        String note
) {
}
