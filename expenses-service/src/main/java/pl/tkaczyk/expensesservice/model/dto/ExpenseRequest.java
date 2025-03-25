package pl.tkaczyk.expensesservice.model.dto;

import pl.tkaczyk.expensesservice.model.ExpenseCategory;

import java.time.LocalDate;

public record ExpenseRequest(
        Long id,
        String name,
        CategoryRequest categoryRequest,
        double amount,
        LocalDate expenseDate,
        String note
) {
}
